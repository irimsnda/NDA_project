Ext.define('Admin.view.parameters.views.widgets.Confirmation_win',{
    extend:'Ext.window.Window',
    alias: 'widget.confirmation_win',
    controller: 'params_vcr',
    modal: true,
    bodyPadding: 4,
    items:[
        {
            xtype:'confirmationsfrm'
        }
    ]
});