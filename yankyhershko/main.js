$('#homegallery').justifiedGallery({
    rowHeight : 500,
    lastRow : 'justify',
    margins : 10
});

$('#mygallery').justifiedGallery({
    rowHeight : 350,
    lastRow : 'justify',
    margins : 10
});


$('#btsgallery').justifiedGallery({
    rowHeight : 250,
    lastRow : 'justify',
    margins : 10
});

$('#finalgallery').justifiedGallery({
    rowHeight : 250,
    lastRow : 'justify',
    margins : 10
});

    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'disableScrolling': true
    })


function showmenu(){

document.getElementById('menu').className  = 'visiblemenu';
document.getElementById('burgerdiv').innerHTML = '<p id="burger" onclick="hidemenu()"><i class="fal fa-times"></i></p>'


}

function hidemenu(){

  document.getElementById('menu').className  = 'hiddenmenu';
document.getElementById('burgerdiv').innerHTML = '<p id="burger" onclick="showmenu()"><i class="fal fa-bars"></i></p>'


}
