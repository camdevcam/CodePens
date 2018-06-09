var NumberOfWords = 14

var words1 = new BuildArray(NumberOfWords)

  words1[1] = "best"
  words1[2] = "most talented"
  words1[3] = "most creative"
  words1[4] = "top notch"
  words1[5] = "coolest"
  words1[6] = "hottest"
  words1[7] = "most amazing"
  words1[8] = "fastest"
  words1[9] = "most rad"
  words1[10] = "funnest"
  words1[11] = "jolliest"
  words1[12] = "Sir Dev Alot"
  words1[13] = "Dr Dev"
  words1[14] = "mejor diseñador"

function BuildArray(size){
  this.length = size
  for (var i = 1; i <= size; i++){
  this[i] = null}
  return this
}

var words2 = new BuildArray(NumberOfWords)

  words2[1] = "web apps"
  words2[2] = "websites"
  words2[3] = "softwares"
  words2[4] = "cold brews"
  words2[5] = "tear drops"
  words2[6] = "popsicles"
  words2[7] = "game changers"
  words2[8] = "Michelobs"
  words2[9] = "functionalities"
  words2[10] = "demos"
  words2[11] = "codepens"
  words2[12] = "fiddles"
  words2[13] = "poodles"
  words2[14] = "crisp nuggets"

function BuildArray(size){
  this.length = size
  for (var i = 1; i <= size; i++){
  this[i] = null}
  return this
}
var words3 = new BuildArray(NumberOfWords)

  words3[1] = "spazzing"
  words3[2] = "coding"
  words3[3] = "jazzing"
  words3[4] = "caffeinated"
  words3[5] = "running"
  words3[6] = "robocopping"
  words3[7] = "jumping"
  words3[8] = "eatting"
  words3[9] = "sleeping"
  words3[10] = "working"
  words3[11] = "jawzrsizing"
  words3[12] = "loving"
  words3[13] = "being"
  words3[14] = "sliding"

function BuildArray(size){
  this.length = size
  for (var i = 1; i <= size; i++){
  this[i] = null}
  return this
}

function PickRandomWord(frm) {
  // Generate a random number between 1 and NumberOfWords
  var rnd = Math.ceil(Math.random() * NumberOfWords)
  // Display the word inside the text box
  frm.WordBox.value = words1[rnd]
  frm.WordBox2.value = words2[rnd]  
  frm.WordBox3.value = words3[rnd]    
}