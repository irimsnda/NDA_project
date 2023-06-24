Ext.define('Admin.view.configurations.views.forms.ReportDesignerViewerFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'reportDesignerViewerFrm',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'configurationsvctr',
    viewModel: 'configurationsvm',
    layout: 'fit',
    listeners: {
        afterRender: function() {
            console.log("Test 1234");
        }
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
            xtype: 'hiddenfield',
            name: 'report_id'
        },{
            xtype: 'ckeditor',
            layout:'fit',
            region: 'center',
            title: 'View',
            split: true,
            width: '100%',
            bind: {
                value: '{viewerValue}'
            },
            height: '55vh',
            name:'htmlValue',
            // height: Ext.Element.getViewportHeight() - 200,
            // autoHeight: true
        }],
    tbar: ['->',{
        xtype: 'button',
        text: 'Save Designed Report',
        ui: 'soft-green',
        handler: 'onSaveDesignedReport'
    },{
        xtype: 'button',
        text: 'Reset to Previously Captured',
        ui:'soft-purple',
        handler: 'resetDesignedReport'
    }]
});