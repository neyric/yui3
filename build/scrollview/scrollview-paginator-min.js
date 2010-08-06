YUI.add("scrollview-paginator",function(D){var B=0.5,C=D.ScrollView.UI_SRC;function A(){A.superclass.constructor.apply(this,arguments);}A.NAME="pluginScrollViewPaginator";A.NS="pages";A.ATTRS={selector:{value:null},index:{value:0},total:{value:0}};D.extend(A,D.Plugin.Base,{initializer:function(){var E;E=this._host=this.get("host");this.afterHostMethod("_uiDimensionsChange",this._calculatePageOffsets);this.afterHostMethod("_onGestureMoveStart",this._setBoundaryPoints);this.afterHostMethod("_flick",this._afterFlick);this.afterHostEvent("scrollEnd",this._scrollEnded);this.after("indexChange",this._afterIndexChange);if(E.get("bounce")!==0){this._originalHostBounce=E.get("bounce");E.set("bounce",B);}},destructor:function(){var E=this._host;if(E.get("bounce")!==0){E.set("bounce",this._originalHostBounce);}},_calculatePageOffsets:function(){var H=this._host,F=H.get("contentBox"),I=this.get("selector"),E,G=[];E=I?F.all(I):F.get("children");E.each(function(K,J){G.push(K.get("offsetLeft"));},this);G.push(H._scrollWidth-H.get("width"));this._minPoints=G;this.set("total",E.size());},_setBoundaryPoints:function(G){var F=this._host,E=this.get("index");if(F._scrollsHorizontal){if(D.Lang.isNumber(this._minPoints[E-1])){F._minScrollX=this._minPoints[E-1];}else{F._minScrollX=this._minPoints[E];}F._maxScrollX=this._minPoints[E+1];}},_afterFlick:function(K){var H=this._host,G=H._currentVelocity,J=G<0,I=Math.abs(G),E=this.get("index"),F=this.get("total");if(I<1){H._currentVelocity=J?-1:1;}if(J&&E<F-1){this.set("index",E+1,{src:C});}else{if(!J&&E>0){this.set("index",E-1,{src:C});}}},_scrollEnded:function(H){var G=this._host,E=this.get("index"),F=this.get("total");if(H.staleScroll){if(G._scrolledHalfway){if(G._scrolledForward&&E<F-1){this.set("index",E+1);}else{if(E>0){this.set("index",E-1);}else{this.snapToCurrent();}}}else{this.snapToCurrent();}}},_afterIndexChange:function(E){if(E.src!==C){this._uiIndex(E.newVal);}},_uiIndex:function(E){this.scrollTo(E,350,"ease-out");},next:function(F){var E=this.get("index");if(E<this.get("total")-1){this.set("index",E+1);}},prev:function(F){var E=this.get("index");if(E>0){this.set("index",E-1);}},scrollTo:function(F,H,I){var G=this._host,E=G.get("scrollX");if(G._scrollsHorizontal){E=this._minPoints[F];G.set("scrollX",E,{duration:H,easing:I});}},snapToCurrent:function(){this._host._killTimer();this._host.set("scrollX",this._minPoints[this.get("index")],{duration:300,easing:"ease-out"});}});D.namespace("Plugin").ScrollViewPaginator=A;},"@VERSION@",{skinnable:true,requires:["plugin"]});