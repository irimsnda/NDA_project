$(document).ready(function () {
    $("#respMenu").aceResponsiveMenu({

        resizeWidth: '768', // Set the same in Media query       
  
        animationSpeed: 'fast', //slow, medium, fast
  
        accoridonExpAll: false //Expands all the accordion menu on click
  
    });
        $('.select2').select2();
        var url = window.location;

    // for sidebar menu entirely but not cover treeview
    $('ul.sidebar-menu a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');
    //Top bar
    $('ul.navbar-nav a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');

    // for treeview
    $('ul.treeview-menu a').filter(function() {
        return this.href == url;
    }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active');
     
      
      $(".loader").fadeOut("slow");
      $(".loader_gif").fadeOut("slow");
});