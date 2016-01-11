document.body.onload = flexControl;

function flexControl() {
    var $ = function(el) {
        return document.querySelectorAll(el);
    };
    var _$ = function(el) {
        return document.querySelector(el);
    };
    var addNode = function(el) {
        return document.createElement(el);
    };
    var siblings = function(el) {
        return [].slice.call(el.parentElement.children).filter(function(v) {
            return v!= el;
        });
    };
    var closestByClass = function(el, clazz) {
        while(el.className != clazz) {
            el = el.parentElement;
            if(!el) {
                return null;
            }
        } return el;
    };
    // need to be elicited


    var $playground = _$('.playground');
    var $addNewItemBtn = _$('#add-new-flex-item');
    $addNewItemBtn.addEventListener('click', function() {
         var $newItem = addNode('div');
         $newItem.classList.add('fbox');

         var $utilbox = addNode('div');
         $utilbox.classList.add('fbox__utilbox');
         close_item_html = '<div class="fbox__utilbox-close"><span>x</span></div>';
         clone_item_html = '<div class="fbox__utilbox-clone"><span>clone</span></div>';
         $utilbox.innerHTML += (close_item_html + clone_item_html);
         $newItem.appendChild($utilbox);



         var itemWidth = _$('#flex-item-ctr__basic-width').value;
         var itemHeight = _$('#flex-item-ctr__basic-height').value;

         if(!itemHeight) {
             itemHeight = 'auto';
         }
         if(!itemWidth) {
             itemWidth = 'auto'
         }

         $newItem.style['width']  = itemWidth;
         $newItem.style['height'] = itemHeight;

         $playground.appendChild($newItem);
    }, false);


    //BOX BASIC
    $boxSet = _$('#flex-box-ctr__basic-set');
    $boxSet.addEventListener('click', function(){

        var boxWidth = _$('#flex-box-ctr__basic-width').value;
        var boxHeight = _$('#flex-box-ctr__basic-height').value;
        if(! boxWidth) {
            boxWidth = 'auto';
        }
        if(! boxHeight)  {
            boxHeight = 'auto';
        }

        $playground.style['width'] = boxWidth;
        $playground.style['height'] = boxHeight;
    }, false);


    //Justify content
    var jstf_radios = document.getElementsByName('box-jstf-radio');
    for(var i=0; i<jstf_radios.length; i++) {
        jstf_radios[i].addEventListener('click',function() {
            $playground.style['justify-content'] = this.value;
            checkMark(this);
        } ,false);
    }

    //Align-Items
    var xrsax_radios = document.getElementsByName('box-xrsax-radio');
    for(var i=0; i<xrsax_radios.length; i++) {
        xrsax_radios[i].addEventListener('click',function() {
            $playground.style['align-items'] = this.value;
            checkMark(this);
        }, false);
    }

    //Align-content
    var mainax_radios = document.getElementsByName('box-mainax-radio');
    for(var i=0; i<mainax_radios.length; i++) {
        mainax_radios[i].addEventListener('click', function(){
            $playground.style['align-content'] = this.value;
            checkMark(this);
        }, false);
    }

    var checkMark = function(el) {
        //console.log(el);
        var checked_item = el.parentElement;
        checked_item.classList.add('radio-tags_checked');
        var unchecked_items = siblings(checked_item);
        //console.log(unchecked_items);
        unchecked_items.forEach(function(unchecked_item) {
            unchecked_item.classList.remove('radio-tags_checked');
        });
    };

    //item-close
        _$('.playground').addEventListener('click', function(el){
        var target = el.target;
        //console.log(el);
        if(target.tagName === 'SPAN' && target.innerHTML === "x") {
            closestByClass(target, 'fbox').style['display'] = 'none';
        }
    }, false);

    //item-clone

}
