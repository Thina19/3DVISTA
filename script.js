(function(){
    var script = {
 "shadow": false,
 "data": {
  "name": "Player3105"
 },
 "children": [
  "this.MainViewer",
  "this.Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
  "this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
  "this.Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C",
  "this.HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132"
 ],
 "id": "rootPlayer",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "visible",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A].forEach(function(component) { component.set('visible', false); }) }",
 "backgroundPreloadEnabled": true,
 "width": "100%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "vrPolyfillScale": 0.5,
 "horizontalAlign": "left",
 "borderSize": 0,
 "defaultVRPointer": "laser",
 "verticalAlign": "top",
 "buttonToggleFullscreen": "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "scripts": {
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "existsKey": function(key){  return key in window; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getKey": function(key){  return window[key]; },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "unregisterKey": function(key){  delete window[key]; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); }
 },
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 20,
 "borderRadius": 0,
 "downloadEnabled": false,
 "contentOpaque": false,
 "class": "Player",
 "minWidth": 20,
 "height": "100%",
 "paddingBottom": 0,
 "mouseWheelEnabled": true,
 "paddingTop": 0,
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -80.39,
  "pitch": 0
 },
 "id": "camera_2025A200_3425_A1B8_4183_C3F388A5A980"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -6.53,
  "pitch": 1.51
 },
 "id": "panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.64,
  "pitch": 0
 },
 "id": "camera_275D60BD_3425_A2C8_41C6_01040C8229C2"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 161.78,
  "pitch": 0
 },
 "id": "camera_27819154_3425_A258_41C3_264F08BC0B36"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 27.13,
  "pitch": 0
 },
 "id": "camera_27C6F1D5_3425_A258_41B4_C921D1914BAF"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.55,
  "pitch": -1.76
 },
 "id": "panorama_24CBF371_3422_6660_41A1_954EA06A327F_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -148.48,
  "pitch": 0
 },
 "id": "camera_27B050F1_3425_A259_41C1_6E1CCF6D2330"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_camera"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_3B474F73_3422_BE60_41B8_7A0FE767D73E",
  "this.overlay_3B47AF73_3422_BE60_41C6_12A19FB872B0"
 ],
 "label": "GDT ID ground floor 360 view 02",
 "id": "panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14",
   "class": "AdjacentPanorama",
   "yaw": -164.18,
   "distance": 1,
   "backwardYaw": -85.74
  },
  {
   "panorama": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4",
   "class": "AdjacentPanorama",
   "yaw": -3.11,
   "distance": 1,
   "backwardYaw": -160.36
  }
 ]
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_3B82C155_341E_A3A0_41BF_7D8D54D584EE"
 ],
 "label": "GDT ID ground floor 360 view 01",
 "id": "panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D",
   "class": "AdjacentPanorama",
   "yaw": -85.74,
   "distance": 1,
   "backwardYaw": -164.18
  }
 ]
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_25370A1B_3422_61A0_41B9_F132747D3631",
  "this.overlay_25373A1B_3422_61A0_41B2_60B2C8835303"
 ],
 "label": "GDT ID ground floor 360 view 04",
 "id": "panorama_25371A1A_3422_61A0_41C4_950CD494F2A1",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4",
   "class": "AdjacentPanorama",
   "yaw": -166.94,
   "distance": 1,
   "backwardYaw": 18.46
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama",
   "yaw": -18.22,
   "distance": 1,
   "backwardYaw": -64.69
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama",
   "yaw": -166.94,
   "distance": 1,
   "backwardYaw": -64.69
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_camera"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_24E7ADB6_3425_A2E0_41B7_154019F29AB3",
  "this.overlay_24E78DB6_3425_A2E0_41BF_29EB0363A90D"
 ],
 "label": "GDT ID ground floor 360 view 08",
 "id": "panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41",
   "class": "AdjacentPanorama",
   "yaw": -164.18,
   "distance": 1,
   "backwardYaw": 31.52
  },
  {
   "panorama": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C",
   "class": "AdjacentPanorama",
   "yaw": 1.63,
   "distance": 1,
   "backwardYaw": -156.14
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.7,
  "pitch": 0
 },
 "id": "camera_2792C13C_3425_A3C8_41BC_79C9F6B7AC0D"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_244A50B9_3422_A2E0_41C0_52B93855FD4F",
  "this.overlay_244A30B9_3422_A2E0_41C8_74B2281AA98D"
 ],
 "label": "GDT ID ground floor 360 view 03",
 "id": "panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D",
   "class": "AdjacentPanorama",
   "yaw": -160.36,
   "distance": 1,
   "backwardYaw": -3.11
  },
  {
   "panorama": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1",
   "class": "AdjacentPanorama",
   "yaw": 18.46,
   "distance": 1,
   "backwardYaw": -166.94
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.2,
  "pitch": 0
 },
 "id": "camera_27FCE188_3425_A2C8_41C0_B9568838ED57"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.89,
  "pitch": 0
 },
 "id": "camera_207FD24B_3425_A648_41A4_E545B5CB732D"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 13.06,
  "pitch": 0
 },
 "id": "camera_206D125D_3425_A649_41A4_6F5E20F70999"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_250E8CA1_3426_A2E0_41C1_769865EA4EE5",
  "this.overlay_250F6CA1_3426_A2E0_41BB_BCB0507D22E1"
 ],
 "label": "GDT ID ground floor 360 view 10",
 "id": "panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C",
   "class": "AdjacentPanorama",
   "yaw": -158.4,
   "distance": 1,
   "backwardYaw": 19.47
  },
  {
   "panorama": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.31,
  "pitch": 0
 },
 "id": "camera_20008226_3425_A1F8_41A7_14038462F0C7"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.26,
  "pitch": 0
 },
 "id": "camera_275270A5_3425_A2F8_41B8_F284E59D70FC"
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_camera"
  },
  {
   "media": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_camera"
  },
  {
   "media": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_camera"
  },
  {
   "media": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_camera"
  },
  {
   "media": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F_camera"
  },
  {
   "media": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_camera"
  },
  {
   "media": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_camera"
  },
  {
   "media": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_camera"
  },
  {
   "media": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_camera"
  },
  {
   "media": "this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9",
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_camera"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.82,
  "pitch": 0
 },
 "id": "camera_278F6171_3425_A258_41B7_46B00848B12F"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 23.86,
  "pitch": 0
 },
 "id": "camera_27BDA108_3425_A3B7_41C0_3A2F3D46223C"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -178.37,
  "pitch": 0
 },
 "id": "camera_27D961BD_3425_A2C8_41AF_4C2F3D1EB3C8"
},
{
 "class": "SlideOutEffect",
 "id": "effect_2745FDF7_ACED_1161_41D1_B5EC4D857875",
 "duration": 0,
 "easing": "linear",
 "to": "right"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.52,
  "pitch": 1.26
 },
 "id": "panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.82,
  "pitch": 0
 },
 "id": "camera_27A67126_3425_A3FB_41BB_C024C108E3D4"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -161.54,
  "pitch": 0
 },
 "id": "camera_20133212_3425_A1D8_4196_287569F207F0"
},
{
 "class": "PlayList",
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "items": [
  {
   "media": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_camera"
  },
  {
   "media": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_camera"
  },
  {
   "media": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_camera"
  },
  {
   "media": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_camera"
  },
  {
   "media": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F_camera"
  },
  {
   "media": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_camera"
  },
  {
   "media": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_camera"
  },
  {
   "media": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_camera"
  },
  {
   "media": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_camera"
  },
  {
   "media": "this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_camera"
  }
 ]
},
{
 "class": "SlideOutEffect",
 "id": "effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8",
 "duration": 0,
 "easing": "linear",
 "to": "right"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_256D9CC1_3422_E2A0_4187_3D1608AEDF02",
  "this.overlay_256DBCC1_3422_E2A0_41C2_2E01500A98D2"
 ],
 "label": "GDT ID ground floor 360 view 06",
 "id": "panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41",
   "class": "AdjacentPanorama",
   "yaw": 87.8,
   "distance": 1,
   "backwardYaw": -152.87
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama",
   "yaw": -87.3,
   "distance": 1,
   "backwardYaw": 99.61
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama",
   "yaw": -87.3,
   "distance": 1,
   "backwardYaw": 99.61
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -10.8,
  "pitch": -0.75
 },
 "id": "panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 21.6,
  "pitch": 0
 },
 "id": "camera_27EA71A0_3425_A2F8_41C5_65A592B62BDA"
},
{
 "class": "SlideInEffect",
 "id": "effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B",
 "duration": 0,
 "easing": "linear",
 "from": "right"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_24CA0371_3422_6660_41B9_7C0384E2CAF9",
  "this.overlay_24CA3371_3422_6660_41A9_E29E935E749B"
 ],
 "label": "GDT ID ground floor 360 view 05",
 "id": "panorama_24CBF371_3422_6660_41A1_954EA06A327F",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28",
   "class": "AdjacentPanorama",
   "yaw": 99.61,
   "distance": 1,
   "backwardYaw": -87.3
  },
  {
   "panorama": "this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1",
   "class": "AdjacentPanorama",
   "yaw": -64.69,
   "distance": 1,
   "backwardYaw": -18.22
  }
 ]
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_3B0A33B7_3426_E6E0_41C1_C0449C89CDB0",
  "this.overlay_3B0AC3B7_3426_E6E0_41BB_5C0D52CE82E9"
 ],
 "label": "GDT ID ground floor 360 view 09",
 "id": "panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9",
   "class": "AdjacentPanorama",
   "yaw": 19.47,
   "distance": 1,
   "backwardYaw": -158.4
  },
  {
   "panorama": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24",
   "class": "AdjacentPanorama",
   "yaw": -156.14,
   "distance": 1,
   "backwardYaw": 1.63
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "class": "SlideInEffect",
 "id": "effect_2745EDF7_ACED_1161_41CE_8D7449621D35",
 "duration": 0,
 "easing": "linear",
 "from": "right"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -160.53,
  "pitch": 0
 },
 "id": "camera_2746F0D9_3425_A248_41C8_1424A8F8CC13"
},
{
 "displayPlaybackBar": true,
 "viewerArea": "this.MainViewer",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "buttonPlayRight": "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "buttonPause": "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "buttonMoveRight": "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "buttonZoomIn": "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "buttonZoomOut": "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "buttonMoveUp": "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "buttonMoveDown": "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "buttonPlayLeft": "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "buttonMoveLeft": "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "touchControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -80.39,
  "pitch": 0
 },
 "id": "camera_203461EE_3425_A248_41A9_4BA9C4EF6680"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "id": "panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_camera"
},
{
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "stereoCube": {
    "levels": [
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 36864,
      "rowCount": 6,
      "colCount": 72,
      "height": 3072
     },
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 18432,
      "rowCount": 3,
      "colCount": 36,
      "height": 1536
     },
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 12288,
      "rowCount": 2,
      "colCount": 24,
      "height": 1024
     },
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0/3/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 6144,
      "rowCount": 1,
      "colCount": 12,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_t.jpg"
  }
 ],
 "class": "Panorama",
 "partial": false,
 "overlays": [
  "this.overlay_24BF083F_3422_61E0_41C2_4408676F030B",
  "this.overlay_24BF183F_3422_61E0_416F_5CA442472761"
 ],
 "label": "GDT ID ground floor 360 view 07",
 "id": "panorama_24BFE83F_3422_61E0_417A_490ED3E59D41",
 "vfov": 180,
 "hfov": 360,
 "pitch": 0,
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_t.jpg",
 "hfovMin": "150%",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24",
   "class": "AdjacentPanorama",
   "yaw": 31.52,
   "distance": 1,
   "backwardYaw": -164.18
  },
  {
   "panorama": "this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28",
   "class": "AdjacentPanorama",
   "yaw": -152.87,
   "distance": 1,
   "backwardYaw": 87.8
  },
  {
   "panorama": "this.panorama_24CBF371_3422_6660_41A1_954EA06A327F",
   "class": "AdjacentPanorama"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 115.31,
  "pitch": 0
 },
 "id": "camera_200E1238_3425_A1C8_41C4_EB337D7DA02E"
},
{
 "progressBackgroundColorDirection": "vertical",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowBlurRadius": 3,
 "id": "MainViewer",
 "left": 0,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#000000",
 "propagateClick": true,
 "playbackBarBottom": 5,
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "width": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipBorderSize": 1,
 "playbackBarHeadWidth": 6,
 "toolTipPaddingTop": 4,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "borderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderSize": 0,
 "class": "ViewerArea",
 "playbackBarProgressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "minWidth": 100,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "toolTipOpacity": 1,
 "toolTipPaddingRight": 6,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowSpread": 0,
 "toolTipFontSize": "0.6vw",
 "toolTipBorderColor": "#767676",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "toolTipShadowVerticalLength": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadow": true,
 "borderSize": 0,
 "toolTipShadowOpacity": 1,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingRight": 0,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipTextShadowOpacity": 0,
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "toolTipFontFamily": "Arial",
 "progressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "toolTipFontColor": "#606060",
 "data": {
  "name": "Main Viewer"
 },
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 0,
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingBottom": 4,
 "progressBarBorderColor": "#000000"
},
{
 "shadow": false,
 "children": [
  "this.Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
  "this.Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
  "this.Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2"
 ],
 "id": "Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
 "left": "79.38%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "right": "1.2%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "horizontalAlign": "left",
 "borderSize": 0,
 "verticalAlign": "top",
 "paddingRight": 0,
 "top": "0%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "100%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Right Side Container"
 },
 "scrollBarColor": "#000000",
 "gap": 10,
 "scrollBarOpacity": 0.5
},
{
 "shadow": false,
 "children": [
  "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856"
 ],
 "id": "Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
 "left": "0%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "right": "84.23%",
 "scrollBarMargin": 2,
 "layout": "absolute",
 "horizontalAlign": "left",
 "borderSize": 0,
 "verticalAlign": "top",
 "paddingRight": 0,
 "top": "0%",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Left Side Container"
 },
 "scrollBarColor": "#000000",
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "visible": false
},
{
 "shadow": false,
 "children": [
  "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
  "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
  "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
  "this.Container_A7977343_B17D_3EDA_41C0_F47328C07981",
  "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
  "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
  "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
  "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
 ],
 "id": "Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C",
 "left": "40%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "right": "38.77%",
 "scrollBarMargin": 2,
 "overflow": "hidden",
 "horizontalAlign": "center",
 "borderSize": 0,
 "layout": "horizontal",
 "paddingRight": 0,
 "top": "85.03%",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "bottom": "0%",
 "minHeight": 20,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 20,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Middle Control"
 },
 "scrollBarColor": "#000000",
 "gap": 4,
 "scrollBarOpacity": 0.5
},
{
 "shadow": false,
 "id": "HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132",
 "left": "0.01%",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "right": "71.34%",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "paddingRight": 20,
 "top": "0%",
 "paddingLeft": 20,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "height": 65.49,
 "class": "HTMLText",
 "minWidth": 1,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vw;\"><B><I>GTD Ground Floor </I></B></SPAN></SPAN></DIV></div>",
 "paddingBottom": 20,
 "paddingTop": 20,
 "data": {
  "name": "HTMLText53815"
 },
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5
},
{
 "shadow": false,
 "toolTipPaddingBottom": 4,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowBlurRadius": 3,
 "id": "IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "toolTipShadowVerticalLength": 0,
 "width": 54,
 "maxWidth": 128,
 "pressedIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_pressed.png",
 "propagateClick": false,
 "iconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A.png",
 "maxHeight": 128,
 "toolTipBorderRadius": 3,
 "horizontalAlign": "center",
 "toolTipBorderSize": 1,
 "borderSize": 0,
 "toolTipShadowOpacity": 1,
 "toolTipPaddingTop": 4,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "toolTipTextShadowOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "toolTipShadowColor": "#333333",
 "toolTip": "Fullscreen",
 "backgroundOpacity": 0,
 "mode": "toggle",
 "toolTipPaddingLeft": 6,
 "height": 38,
 "toolTipFontFamily": "Arial",
 "class": "IconButton",
 "toolTipTextShadowBlurRadius": 3,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_rollover.png",
 "toolTipFontStyle": "normal",
 "toolTipFontColor": "#606060",
 "paddingBottom": 0,
 "toolTipOpacity": 1,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "toolTipPaddingRight": 6,
 "toolTipFontSize": 12,
 "transparencyActive": true,
 "toolTipFontWeight": "normal",
 "data": {
  "name": "IconButton1493"
 },
 "toolTipBorderColor": "#767676",
 "cursor": "hand",
 "toolTipShadowSpread": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26901CD6_3422_62A0_41A8_30B0C0E890B9",
   "yaw": -3.11,
   "pitch": -15.51,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.94,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4, this.camera_275D60BD_3425_A2C8_41C6_01040C8229C2); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.11,
   "hfov": 16.94,
   "pitch": -15.51
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_3B474F73_3422_BE60_41B8_7A0FE767D73E",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26907CD6_3422_62A0_41A3_D497D7F928A0",
   "yaw": -164.18,
   "pitch": -21.35,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.37,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14, this.camera_275270A5_3425_A2F8_41B8_F284E59D70FC); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.18,
   "hfov": 16.37,
   "pitch": -21.35
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_3B47AF73_3422_BE60_41C6_12A19FB872B0",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26976CD5_3422_62A0_41A9_0749CE320D86",
   "yaw": -85.74,
   "pitch": -20.97,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.41,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D, this.camera_27A67126_3425_A3FB_41BB_C024C108E3D4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.74,
   "hfov": 16.41,
   "pitch": -20.97
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_3B82C155_341E_A3A0_41BF_7D8D54D584EE",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26916CD7_3422_62A0_41C0_31CCBDCFB7D3",
   "yaw": -18.22,
   "pitch": -20.85,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.43,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CBF371_3422_6660_41A1_954EA06A327F, this.camera_20008226_3425_A1F8_41A7_14038462F0C7); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -18.22,
   "hfov": 16.43,
   "pitch": -20.85
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_25370A1B_3422_61A0_41B9_F132747D3631",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2691CCD7_3422_62A0_4182_745172D2218A",
   "yaw": -166.94,
   "pitch": -29.14,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.35,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CBF371_3422_6660_41A1_954EA06A327F, this.camera_200E1238_3425_A1C8_41C4_EB337D7DA02E); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -166.94,
   "hfov": 15.35,
   "pitch": -29.14
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_25373A1B_3422_61A0_41B2_60B2C8835303",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_21BE59A2_343E_62F0_41BE_0538380BDED0",
   "yaw": 1.63,
   "pitch": -16.58,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.85,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C, this.camera_27BDA108_3425_A3B7_41C0_3A2F3D46223C); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.63,
   "hfov": 16.85,
   "pitch": -16.58
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24E7ADB6_3425_A2E0_41B7_154019F29AB3",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_269CCCD8_3422_62A0_41B0_52DC223A3434",
   "yaw": -164.18,
   "pitch": -23.61,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.11,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.18,
   "hfov": 16.11,
   "pitch": -23.61
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24E78DB6_3425_A2E0_41BF_29EB0363A90D",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2690DCD6_3422_62A0_41B3_C93491AA8B3E",
   "yaw": 18.46,
   "pitch": -18.59,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.66,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1, this.camera_206D125D_3425_A649_41A4_6F5E20F70999); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.46,
   "hfov": 16.66,
   "pitch": -18.59
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_244A50B9_3422_A2E0_41C0_52B93855FD4F",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26911CD6_3422_62A0_41C7_C9D16A12A87A",
   "yaw": -160.36,
   "pitch": -9.8,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 17.32,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.36,
   "hfov": 17.32,
   "pitch": -9.8
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_244A30B9_3422_A2E0_41C8_74B2281AA98D",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_21BC89A3_343E_62F0_41AF_0FB078B3F5B9",
   "yaw": -37.81,
   "pitch": -16.83,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.83,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -37.81,
   "hfov": 16.83,
   "pitch": -16.83
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_250E8CA1_3426_A2E0_41C1_769865EA4EE5",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_208A7E95_3423_BEAA_41C0_0CA80923EDD7",
   "yaw": -158.4,
   "pitch": -40.44,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.38,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C, this.camera_2746F0D9_3425_A248_41C8_1424A8F8CC13); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -158.4,
   "hfov": 13.38,
   "pitch": -40.44
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_250F6CA1_3426_A2E0_41BB_BCB0507D22E1",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2692DCD7_3422_62A0_4161_118DE6F3470C",
   "yaw": 87.8,
   "pitch": -19.84,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.53,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24BFE83F_3422_61E0_417A_490ED3E59D41, this.camera_27C6F1D5_3425_A258_41B4_C921D1914BAF); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.8,
   "hfov": 16.53,
   "pitch": -19.84
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_256D9CC1_3422_E2A0_4187_3D1608AEDF02",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26932CD7_3422_62A0_41BE_45E2F3F6EFB0",
   "yaw": -87.3,
   "pitch": -23.36,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.14,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24CBF371_3422_6660_41A1_954EA06A327F, this.camera_2025A200_3425_A1B8_4183_C3F388A5A980); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.3,
   "hfov": 16.14,
   "pitch": -23.36
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_256DBCC1_3422_E2A0_41C2_2E01500A98D2",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_211A0990_3422_62A1_41C1_E8AC561C6709",
   "yaw": 99.61,
   "pitch": -17.58,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.76,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28, this.camera_2792C13C_3425_A3C8_41BC_79C9F6B7AC0D); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 99.61,
   "hfov": 16.76,
   "pitch": -17.58
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24CA0371_3422_6660_41B9_7C0384E2CAF9",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_26927CD7_3422_62A0_419A_C7882DAB176C",
   "yaw": -64.69,
   "pitch": -35.92,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.23,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_25371A1A_3422_61A0_41C4_950CD494F2A1, this.camera_27819154_3425_A258_41C3_264F08BC0B36); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -64.69,
   "hfov": 14.23,
   "pitch": -35.92
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24CA3371_3422_6660_41A9_E29E935E749B",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_21BFD9A3_343E_62F0_41BB_9D81161EA815",
   "yaw": 19.47,
   "pitch": -15.32,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.95,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9, this.camera_27EA71A0_3425_A2F8_41C5_65A592B62BDA); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 19.47,
   "hfov": 16.95,
   "pitch": -15.32
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_3B0A33B7_3426_E6E0_41C1_C0449C89CDB0",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_208AEE94_3423_BEAA_41C8_114DC04A0BC1",
   "yaw": -156.14,
   "pitch": -30.4,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 15.16,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -156.14,
   "hfov": 15.16,
   "pitch": -30.4
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_3B0AC3B7_3426_E6E0_41BB_5C0D52CE82E9",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "shadow": false,
 "id": "IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed.png",
 "width": "11.17%",
 "iconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "29.2%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27671"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed.png",
 "width": "100%",
 "iconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "height": "29.2%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27668"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_pressed.png",
 "width": "8.96%",
 "iconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27670"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_pressed.png",
 "width": "8.91%",
 "iconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27673"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_pressed.png",
 "width": "9.07%",
 "iconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27662"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_pressed.png",
 "width": "80%",
 "iconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27667"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_pressed.png",
 "width": "80%",
 "iconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27669"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_pressed.png",
 "width": "11.27%",
 "iconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "29.2%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27664"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_pressed.png",
 "width": "8.99%",
 "iconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "23.36%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27665"
 },
 "cursor": "hand"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_20882E93_3423_BEAE_41B3_B5004FFFEC63",
   "yaw": 31.52,
   "pitch": -16.08,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.89,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24, this.camera_278F6171_3425_A258_41B7_46B00848B12F); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.52,
   "hfov": 16.89,
   "pitch": -16.08
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24BF083F_3422_61E0_41C2_4408676F030B",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_2693FCD8_3422_62A0_4196_E9905EE4B17E",
   "yaw": -152.87,
   "pitch": -23.86,
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 16.08,
   "distance": 100
  }
 ],
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "maps": [
  {
   "image": {
    "levels": [
     {
      "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -152.87,
   "hfov": 16.08,
   "pitch": -23.86
  }
 ],
 "rollOverDisplay": false,
 "id": "overlay_24BF183F_3422_61E0_416F_5CA442472761",
 "data": {
  "label": "Circle 03b"
 }
},
{
 "shadow": false,
 "children": [
  "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480"
 ],
 "id": "Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "width": "100%",
 "scrollBarMargin": 2,
 "layout": "vertical",
 "horizontalAlign": "center",
 "borderSize": 2,
 "borderColor": "#000000",
 "scrollBarWidth": 10,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 50,
 "backgroundOpacity": 0,
 "contentOpaque": true,
 "height": "72.896%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Floor Plan Container"
 },
 "gap": 5,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "shadow": false,
 "children": [
  "this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9"
 ],
 "id": "Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "width": "100%",
 "layout": "vertical",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "19.78%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Middle"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "shadow": false,
 "children": [
  "this.Container_8886944C_AC33_7318_41AB_EB089F4691B5"
 ],
 "id": "Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "width": "100%",
 "layout": "vertical",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "5.25%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bottom"
 },
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "itemLabelGap": 9,
 "scrollBarVisible": "rollOver",
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856",
 "left": "10%",
 "itemThumbnailShadowColor": "#000000",
 "propagateClick": false,
 "itemLabelFontStyle": "normal",
 "itemThumbnailShadow": true,
 "right": "0.18%",
 "itemMode": "normal",
 "layout": "vertical",
 "itemLabelHorizontalAlign": "center",
 "horizontalAlign": "left",
 "itemLabelFontFamily": "Arial",
 "itemThumbnailShadowOpacity": 0.54,
 "verticalAlign": "top",
 "itemThumbnailOpacity": 1,
 "paddingLeft": 20,
 "minHeight": 20,
 "borderRadius": 5,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "class": "ThumbnailList",
 "minWidth": 20,
 "itemThumbnailBorderRadius": 50,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemThumbnailShadowSpread": 1,
 "itemPaddingRight": 3,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "selectedItemLabelFontColor": "#FFCC00",
 "selectedItemLabelFontWeight": "bold",
 "itemOpacity": 1,
 "shadow": false,
 "itemBackgroundColorRatios": [],
 "itemVerticalAlign": "middle",
 "itemBackgroundOpacity": 0,
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontWeight": "normal",
 "scrollBarMargin": 2,
 "itemThumbnailShadowVerticalLength": 3,
 "selectedItemLabelFontSize": "0.72vw",
 "borderSize": 0,
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "paddingRight": 20,
 "top": "0%",
 "itemThumbnailShadowBlurRadius": 8,
 "scrollBarWidth": 10,
 "bottom": "10%",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": "0.84vw",
 "playList": "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "backgroundOpacity": 0,
 "itemLabelFontColor": "#FFFFFF",
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 60,
 "paddingBottom": 10,
 "rollOverItemLabelFontSize": "0.78vw",
 "paddingTop": 10,
 "gap": 5,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemPaddingBottom": 3,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#FFFFFF"
},
{
 "shadow": false,
 "children": [
  "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
  "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
  "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96"
 ],
 "id": "Container_A7977343_B17D_3EDA_41C0_F47328C07981",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "hidden",
 "scrollBarMargin": 2,
 "width": "11.36%",
 "layout": "vertical",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 20,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "100%",
 "class": "Container",
 "minWidth": 20,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Container27666"
 },
 "gap": 4,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26901CD6_3422_62A0_41A8_30B0C0E890B9",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3B477F73_3422_BE60_41A5_8D64EB7B761D_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26907CD6_3422_62A0_41A3_D497D7F928A0",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3B821155_341E_A3A0_41C3_D0DB781DAA14_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26976CD5_3422_62A0_41A9_0749CE320D86",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26916CD7_3422_62A0_41C0_31CCBDCFB7D3",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_25371A1A_3422_61A0_41C4_950CD494F2A1_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_2691CCD7_3422_62A0_4182_745172D2218A",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_21BE59A2_343E_62F0_41BE_0538380BDED0",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24E44DB5_3425_A2E0_4184_3FB70E25CE24_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_269CCCD8_3422_62A0_41B0_52DC223A3434",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_2690DCD6_3422_62A0_41B3_C93491AA8B3E",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_244A70B9_3422_A2E0_41C0_2B4D4FB1D1C4_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26911CD6_3422_62A0_41C7_C9D16A12A87A",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_21BC89A3_343E_62F0_41AF_0FB078B3F5B9",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_250EACA1_3426_A2E0_41C8_453ACE2F42A9_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_208A7E95_3423_BEAA_41C0_0CA80923EDD7",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_2692DCD7_3422_62A0_4161_118DE6F3470C",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_256DECC1_3422_E2A0_41C8_FB70C1498F28_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26932CD7_3422_62A0_41BE_45E2F3F6EFB0",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_211A0990_3422_62A1_41C1_E8AC561C6709",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24CBF371_3422_6660_41A1_954EA06A327F_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_26927CD7_3422_62A0_419A_C7882DAB176C",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_21BFD9A3_343E_62F0_41BB_9D81161EA815",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_3B0A23B7_3426_E6E0_41BB_42A20BE4C75C_0_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_208AEE94_3423_BEAA_41C8_114DC04A0BC1",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_0_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_20882E93_3423_BEAE_41B3_B5004FFFEC63",
 "colCount": 4
},
{
 "frameCount": 24,
 "levels": [
  {
   "url": "media/panorama_24BFE83F_3422_61E0_417A_490ED3E59D41_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource",
 "frameDuration": 41,
 "rowCount": 6,
 "id": "AnimatedImageResource_2693FCD8_3422_62A0_4196_E9905EE4B17E",
 "colCount": 4
},
{
 "progressBackgroundColorDirection": "vertical",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowBlurRadius": 3,
 "id": "ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480",
 "playbackBarHeadOpacity": 1,
 "toolTipTextShadowColor": "#000000",
 "progressBorderColor": "#000000",
 "propagateClick": false,
 "playbackBarBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "width": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipBorderSize": 1,
 "playbackBarHeadWidth": 6,
 "toolTipPaddingTop": 4,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBorderSize": 0,
 "class": "ViewerArea",
 "toolTipShadowColor": "#333333",
 "toolTipPaddingLeft": 6,
 "minWidth": 1,
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "toolTipOpacity": 1,
 "toolTipPaddingRight": 6,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowSpread": 0,
 "toolTipFontSize": "0.6vw",
 "toolTipBorderColor": "#767676",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarBorderSize": 0,
 "shadow": false,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "toolTipShadowVerticalLength": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadow": true,
 "borderSize": 0,
 "toolTipShadowOpacity": 1,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "paddingRight": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipTextShadowOpacity": 0,
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "playbackBarBorderColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "toolTipFontFamily": "Arial",
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, null, null, false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, null, null, false) }",
 "progressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipDisplayTime": 600,
 "paddingTop": 0,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Floor Plan Viewer"
 },
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15,
 "visible": false,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingBottom": 4,
 "progressBarBorderColor": "#000000"
},
{
 "shadow": false,
 "children": [
  "this.IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
  "this.Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185"
 ],
 "id": "Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "100%",
 "class": "Container",
 "creationPolicy": "inAdvance",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Contact Us Compo"
 },
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "visible": false
},
{
 "shadow": false,
 "children": [
  "this.IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
  "this.Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
  "this.Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E",
  "this.Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709"
 ],
 "id": "Container_8886944C_AC33_7318_41AB_EB089F4691B5",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "width": "100%",
 "layout": "horizontal",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "66.667%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Button CU and FP"
 },
 "gap": 5,
 "scrollBarOpacity": 0,
 "scrollBarColor": "#000000"
},
{
 "shadow": false,
 "id": "IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
 "propagateClick": false,
 "maxWidth": 900,
 "pressedIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_pressed.png",
 "width": "81.529%",
 "iconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E.png",
 "maxHeight": 616,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, null, null, false) }",
 "height": "100%",
 "class": "IconButton",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Contact"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "children": [
  "this.IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
  "this.IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
  "this.IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300"
 ],
 "id": "Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "width": "20%",
 "layout": "vertical",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "height": "100%",
 "class": "Container",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Left Contact Us"
 },
 "gap": 12,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000"
},
{
 "shadow": false,
 "id": "IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed.png",
 "width": "13%",
 "iconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedRollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "height": "100%",
 "class": "IconButton",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Button27669"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "data": {
  "name": "Button Contact Info info"
 },
 "gap": 15,
 "height": "85.65%",
 "id": "Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
 "iconBeforeLabel": true,
 "iconWidth": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "pressedFontSize": "1vw",
 "rollOverBackgroundOpacity": 0.8,
 "layout": "horizontal",
 "rollOverShadow": false,
 "width": "44.1%",
 "horizontalAlign": "center",
 "borderSize": 2,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#FFFFFF",
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "paddingRight": 0,
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#003366"
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "iconHeight": 0,
 "minHeight": 1,
 "borderRadius": 5,
 "mode": "push",
 "backgroundOpacity": 0.15,
 "label": "CONTACT US",
 "backgroundColorDirection": "vertical",
 "pressedRollOverBackgroundColor": [
  "#003366"
 ],
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "minWidth": 1,
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "fontSize": "1vw",
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, this.effect_2745EDF7_ACED_1161_41CE_8D7449621D35, 'showEffect', false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, this.effect_2745FDF7_ACED_1161_41D1_B5EC4D857875, 'hideEffect', false) }",
 "shadowBlurRadius": 15,
 "paddingBottom": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "pressedBackgroundOpacity": 1
},
{
 "shadow": false,
 "data": {
  "name": "Button Floor Plan"
 },
 "gap": 5,
 "pressedRollOverFontSize": "1vw",
 "id": "Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E",
 "iconBeforeLabel": true,
 "iconWidth": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "height": "85.65%",
 "layout": "horizontal",
 "rollOverShadow": false,
 "width": "44.1%",
 "horizontalAlign": "center",
 "borderSize": 2,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderColor": "#FFFFFF",
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "paddingRight": 0,
 "pressedBackgroundColor": [
  "#003366"
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "iconHeight": 0,
 "minHeight": 1,
 "borderRadius": 5,
 "mode": "push",
 "backgroundOpacity": 0.15,
 "label": "FLOOR PLAN",
 "backgroundColorDirection": "vertical",
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "class": "Button",
 "minWidth": 1,
 "fontSize": "1vw",
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, this.effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B, 'showEffect', false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, this.effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8, 'hideEffect', false) }",
 "shadowBlurRadius": 15,
 "paddingBottom": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textDecoration": "none",
 "visible": false,
 "cursor": "hand",
 "fontWeight": "bold",
 "pressedBackgroundOpacity": 1
},
{
 "shadow": false,
 "id": "Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709",
 "propagateClick": false,
 "maxWidth": 214,
 "width": "30.126%",
 "maxHeight": 85,
 "url": "skin/Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709.png",
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundOpacity": 0,
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "height": "100%",
 "class": "Image",
 "minWidth": 1,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "CMED"
 }
},
{
 "shadow": false,
 "id": "IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
 "propagateClick": false,
 "maxWidth": 50,
 "pressedIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed.png",
 "width": "100%",
 "iconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48.png",
 "maxHeight": 50,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "pressedRollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed_rollover.png",
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "height": "25%",
 "class": "IconButton",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Website"
 },
 "transparencyActive": false,
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
 "propagateClick": false,
 "maxWidth": 50,
 "pressedIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_pressed.png",
 "width": "100%",
 "iconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2.png",
 "maxHeight": 50,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "click": "this.openLink('https://www.google.com/maps/place/CMED+Construction+Company/@11.5450478,104.9248668,15z/data=!4m5!3m4!1s0x0:0x7e215fce7b5af38c!8m2!3d11.5450478!4d104.9248668', '_blank')",
 "height": "25%",
 "class": "IconButton",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Map"
 },
 "cursor": "hand"
},
{
 "shadow": false,
 "id": "IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300",
 "propagateClick": false,
 "maxWidth": 50,
 "pressedIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_pressed.png",
 "width": "100%",
 "iconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300.png",
 "maxHeight": 50,
 "horizontalAlign": "center",
 "borderSize": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "click": "this.openLink('https://www.linkedin.com/company/cmedcc/', '_blank')",
 "height": "25%",
 "class": "IconButton",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_rollover.png",
 "paddingBottom": 0,
 "paddingTop": 0,
 "transparencyActive": false,
 "data": {
  "name": "Linkin"
 },
 "cursor": "hand"
}],
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "gap": 10
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
