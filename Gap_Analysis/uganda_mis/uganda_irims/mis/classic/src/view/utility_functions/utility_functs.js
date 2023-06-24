function download_report(url)
{
    var win = Ext.create('Ext.window.Window', {
        title : 'Download/Export Dialog',
        modal : true,
        width : 350,
        height : 250,
        frame : true,
        // closable: false,
        items : [ {
            xtype : 'component',
            autoEl : { tag : 'iframe', style : 'height: 100%; width: 100%; background-image: ', src : url },
            listeners : {
                load : {
                    element : 'el',
                    fn : function() {
                        win.body.unmask();
                    }
                },
                render : function() {
                    this.up('window').body.mask('Loading...');
                }
            }
        } ]

    });
    win.show();
    Ext.Function.defer(function() {
        win.close();
    }, 15000);
}
function funcCheckisDisabled(value, meta)
{
    if(value == 0) {
        meta.style = "background-color:green;font-size: 10px; font-weight:bold;color: #fff";
        return 'Active';
    } else {
        meta.style = "background-color:#ff0000;font-size: 10px; font-weight:bold;";
        return 'Disabled';
    }
}

function print_report(url)
{
    var win = Ext.create('Ext.window.Window', {
        title : 'Print Dialog',
        modal : true,
        width : 1000,
        height : 650,
        frame : true,
        items : [ {
            xtype : 'component',
            autoEl : { tag : 'iframe', style : 'height: 100%; width: 100%; overflow-x: auto;', src : url },
            listeners : {
                load : {
                    element : 'el',
                    fn : function(th) {
                        win.body.unmask();
                    }
                },
                render : function() {
                    this.up('window').body.mask('Loading...');
                }
            }
        } ]

    });
    win.show();
}

function showExternalLinks(url)
{
    var win = Ext.create('Ext.window.Window', {
        title : 'External Link',
        modal : true,
        width : 1000,
        height : 650,
        frame : true,
        items : [ {
            xtype : 'component',
            autoEl :
                { tag : 'iframe', target : '_top', style : 'height: 100%; width: 100%; overflow-x: auto;', src : url },
            listeners : {
                load : {
                    element : 'el',
                    fn : function() {
                        win.body.unmask();
                    }
                },
                render : function() {
                    this.up('window').body.mask('Loading...');
                }
            }
        } ]

    });
    win.show();
}

function reloadYearStore(lower_limit, upper_limit)
{
    /* var store = Ext.getStore('years_str'),
         years = [],
         counter = 0;
     for (var i = lower_limit; i <= upper_limit; i++) {
         years[counter] = {
             id: i,
             name: i
         };
         counter++;
     }
     store.loadData(years);*/
}

function convert_object(obj)
{
    var str = '';
    for(var p in obj) {
        if(obj.hasOwnProperty(p)) {
            str += '&' + p + '=' + obj[p];
        }
    }
    return str;
}

function generateFormreport(form, redirect)
{
    var form_values = form.getValues();
    form_values = convert_object(form_values);
    if(form.isValid()) {
        var redirect = redirect + form_values;
        print_report(redirect);
    } else {
        toastr.error('Check the filter options before print.', 'Alert');
    }
}

function generateFormreportDownload(form, redirect)
{
    var form_values = form.getValues();
    form_values = convert_object(form_values);
    if(form.isValid()) {
        var redirect = redirect + form_values;
        download_report(redirect);
    } else {
        toastr.error('Check the filter options before print.', 'Alert');
    }
}

function convert_objectToparams(obj)
{
    var str = '';
    for(var p in obj) {
        if(obj.hasOwnProperty(p)) {
            str += +p + ':' + obj[p] + ',';
        }
    }
    return str;
}

function showSubModuleDMS(parent_id, sub_module_id, action_url)
{
    Ext.MessageBox.show({
        msg : 'Opening DMS, Please wait...',
        progressText : 'Initializing...',
        width : 300,
        wait : { interval : 100 }
    });
    Ext.Ajax.request({
        url : action_url,
        params : { parent_id : parent_id, sub_module_id : sub_module_id, _token : token },
        success : function(response) {
            Ext.MessageBox.hide();
            var resp = Ext.JSON.decode(response.responseText), success = resp.success, message = resp.message;
            if(success || success == true || success === true) {
                var folder_id = resp.folder_id;
                showDMSWin(folder_id);
            } else {
                toastr.error(message, 'Failure Response!!');
            }
        },
        failure : function(response) {
            Ext.MessageBox.hide();
            var resp = Ext.JSON.decode(response.responseText), success = resp.success, message = resp.message;
            toastr.warning(message, 'Failure Response!!');
        },
        error : function(jqXHR, textStatus, errorThrown) {
            Ext.MessageBox.hide();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function showDMSWin(folder_id)
{
    var win = Ext.create('Ext.window.Window', {
        title : 'DMS',
        modal : true,
        width : 1020,
        height : 650,
        frame : true,
        items : [ {
            xtype : 'component',
            autoEl : {
                tag : 'iframe',
                style : 'height: 100%; width: 100%; overflow-x: auto;',
                src : base_url + '/mis_dms/out/out.ViewFolder.php?folderid=' + folder_id + '&showtree=0'
            }
        } ]

    });
    win.show();
}

function showMask(title, message)
{
    Ext.MessageBox.show({ msg : message, progressText : title, width : 300, wait : { interval : 200 } });
}

function hideMask()
{
    setTimeout(function() {
        Ext.MessageBox.hide();
    }, 50);
}

function func_reloadStore(th){
    var store = th.store;
        store.removeAll();
        store.load();
}