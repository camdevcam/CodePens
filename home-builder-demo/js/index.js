var state = {
    input: {
        age: {
            value: 0,
            error: ''
        },
        rel: {
            value: '',
            error: ''
        },
        smoker: {
            value: false,
            error: ''
        }
    },
    form: {
        editted: 'You updatted your household.<br><strong>Please click "Submit" to record your changes.</strong>',
        saved: '<strong>Your changes have been submitted.</strong> Thanks!<br>If you make new updates to your home, please click "Submit" again.',
        failed: '<strong>Something was wrong, and were unable to save your household information.</strong><br>Please try again.'
    },
    saved: {} 
};

var elems = {
    form: document.querySelector('.builder form'),
    saved: document.querySelector('.household'),
    debug: document.querySelector('.debug'),

    age: document.querySelector('input[name="age"]'),
    rel: document.querySelector('select[name="rel"]'),
    smoker: document.querySelector('input[name="smoker"]')
};

var ageError = document.createElement('span');
elems.age.parentNode.appendChild(ageError);

var relError = document.createElement('span');
elems.rel.parentNode.appendChild(relError);

var formStatus = document.createElement('p');
elems.form.appendChild(formStatus);

var demooutput = {
    age: elems.form.querySelector('input[name="age"] + span'),
    rel: elems.form.querySelector('select[name="rel"] + span'),
    status: elems.form.querySelector('p')
};

var core = {
    savedMember: function(id, age, rel, smoker) {

        var elem = document.createElement('li');
        elem.setAttribute('id', id);

        if (smoker === true)
            smoker = "smoker";
        else
            smoker = "not-smoker";

        elem.innerHTML = rel + ' - ' + age + ' years old and ' + smoker;

        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', 'Remove');

        button.addEventListener('click', function() {
            removeSaved(id);
        }, false);

        elem.appendChild(button);
        return elem;
    }
};

function makeSequence(start) {
    var i = start;
    return function() {
        return i++;
    }
}

var pushId = makeSequence(0);

function renderState() {
    demooutput.age.innerHTML = state.input.age.error;
    demooutput.rel.innerHTML = state.input.rel.error;
}

function renderSavedState() {
    elems.saved.innerHTML = ''; 

    for (var id in state.saved) {
        var child = core.savedMember(id, state.saved[id].age, state.saved[id].rel, state.saved[id].smoker);
        elems.saved.appendChild(child);
    }
}

function saveInput() {
    if (state.input.age.error || state.input.rel.error)
        return;

    state.saved[pushId()] = {
        age: state.input.age.value,
        rel: state.input.rel.value,
        smoker: state.input.smoker
    };
    renderSavedState();
}

function removeSaved(id) {
    delete state.saved[id];
    renderSavedState();
}

elems.form.querySelector('.add').addEventListener('click', function(e) {
    e.preventDefault();
    var age = parseFloat(elems.age.value);
    var rel = elems.rel.options[elems.rel.selectedIndex].value;
    var smoker = elems.smoker.checked;
    state.input.smoker = smoker;

    if (isNaN(age) || age <= 0) {
        state.input.age.error = 'Please enter a valid age.';
    } else {
        state.input.age.error = '';
        state.input.age.value = age;
    }

    if (rel === '') {
        state.input.rel.error = 'Please select a relationship.';
    } else {
        state.input.rel.error = '';
        state.input.rel.value = rel;
    }
    renderState();

    if (!state.input.age.error && !state.input.rel.error) {
        demooutput.status.innerHTML = state.form.editted;
        saveInput();
    }

    return false;
}, false);

elems.form.querySelector('button[type="submit"]').addEventListener('click', function(e) {
    e.preventDefault();

    var request = new XMLHttpRequest();
    var data = JSON.stringify(state.saved);
    request.open('POST', '/', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send(data);

    demooutput.status.innerHTML = state.form.saved;

    document.querySelector(".debug").style = "display:block";
  
    elems.debug.innerHTML = JSON.stringify(state.saved, null, 2);
  
      /*
    request.readyformsubmission = function () {
      var ready = 4;
      var success = 200;
      if (request.readyState === ready) {
        if (request.status === success) {
          demooutput.status.innerHTML = state.form.saved;
        }
        else {
          demooutput.status.innerHTML = state.form.failed;
        }
      }
    };

    */
  
});