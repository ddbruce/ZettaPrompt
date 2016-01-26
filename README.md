# ZettaPrompt
ZettaPrompt is a JavaScript-based, keyboard-controlled teleprompter application. It can be used without a web server, run directly from `index.html`.

Shortcut keys are as follows:

|Key|Command|
|:-:|-------|
|`f`|Scroll through script forward|
|`shift`+`f` or `ctrl`+`f`|Scrolls script forward more quickly|
|`ctrl`+`shift`+`f`| Scrolls script forward even quicker|
|`r`|Scroll scrough script backward|
|`shift`+`r` or `ctrl`+`r`|Scrolls script backward more quickly|
|`ctrl`+`shift`+`r`| Scrolls script backward even quicker|
|`space`|Starts/stops scrollng<sup>1</sup>|
|`down`|Increases forward scroll rate|
|`shift`+`down`|Scrubs script forward by 150 pixels|
|`up`|Decreases forward scroll rate<sup>2</sup>|
|`shift`+`up`|Scrubs script backward by 150 pixels|


Notes:  
<sup>1</sup> `space` will resume scrolling at the same speed previously used. If there was no preset scrolling speed, it will scroll at the slowest possible speed.  
<sup>2</sup> `up`, if used when the text is stopped, will scroll backwards.