# Simple-Connections

This is an attempt to recreate the NYT game known as Connections. 

If you're unfamiliar with connections,
[descriptionGoesHere]


### My Process

I am pretty familiar with this game so 
When I was given this task, I found it hard to not immediately jump into thinking about what components were needed. But to help me wrap my mind around what needs to be built, I headed to excalidraw to really get a grasp of what basic scaffolding of the project would be.

[ExcalidrawLinkGoesHere]

After drawing up the components, I started out making the parent containers for the Game, Gameboard, and Remaining Tries components. And then I added some base styles just to have a skeleton of the game rendering because if it didn't look right to me while scaffolding it, it would just continue to bug me while trying to create the actual busineess logic. 

[ScaffoldingStateLinkGoesHere]

I decided to try my hand at the logic for the game at this point, and this is where I made my first mistake: not defining the data model. 

When the original scaffolding went up, there were placeholders for the words listed in just a basic array called testWords so that I could map out the items in React more cleanly. Something like:

```
const testWords = ['a', 'b', 'c', ...]

const answerKey = [
  ['a', 'b', 'c', 'd'],
  ['e', 'f', 'g', 'h'],
  ...
];
```

This was fine for scaffolding. However, I was now trying to implement the logic for the validation of the answers and that meant that I would've had to iterate over an array of arrays (answerKey) and identify if each item of the currently selected array was included in one of the arrays in answerKey. I tried to cook up a solution involving a series of higher-order JS functions (.every, .some, .includes) but was having difficulty implementing the proper solution do to how .every would short-circuit if the first entry in answerKey wasn't a perfect match. That's by design (thanks MDN) but also made me think of a data structure that would potentially help with the batch of words in the answerKey. This led me to refactor that answerKey into an array of objects in the shape of 

```
since we're managing the state for the answers here,
create the answerRow object here and pass it down to correctAnswer
potential for useContext? Gameboard is just passing props anyways
Instead of the answerkey holding just the sets of answers, maybe 
make an array of objects with an answer Set on it and a description,
then you can just pass down the specific set that matches. Array.find...
{
  description: 'answer1',
  answerKey: new Set([...])
},
{
  description: 'answer1',
  answerKey: new Set([...])
}, 
and so on
```

And in changing the data model for the answerKey, I had to change the data model everywhere else in my code. This meant in each component where the answers were referenced and in their respective type definitions. Then having to test again manually that things were still working as expected. (More on testing later)

Big Oof. 

It wasn't even a terribly large amount of code, but it was a tedious process. 

However, now that it's in an object shape, it's easier to extend that shape if needbe.

~ Intermission ~

Now I've discovered that once I added the styling for selecting a word, the game board needs to re-render, but it's moving the updated word object to the last item on the game board. so I'm going to add the indexPosition to the word object so that I can maintain it's position when the game board re-renders

I tried using the native dialog element and ran into an issue when styling. When I tried to add a class name with a flex/fixed position declaration to the dialog element itself, the dialog stopped disappearing from the screen when it was dismissed. After doing some refactoring I found that there probably was some interaction with the ::backdrop psuedo-class that the native dialog has total control over that caused this bug. So I basically added a wrapper around the content that I needed to center and added the flex class there rather than on the dialog itself.

https://tympanus.net/codrops/2021/10/06/how-to-implement-and-style-the-dialog-element/