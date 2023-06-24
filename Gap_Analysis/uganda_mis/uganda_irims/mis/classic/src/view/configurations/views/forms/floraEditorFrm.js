Ext.define('Admin.view.configurations.views.forms.floraEditorFrm', {
    extend: 'Ext.panel.Panel',
    xtype: 'floraEditorFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'fit',
    frame: true,
    bodyPadding: 8,
    items: [{
        xtype: 'panel',
        padding: 20,
        items: [{
                xtype: 'textarea',
                id: 'mytextareaid',
                width: '100%',
                height: 400,
                value: "textAreaValue",
            }],
        listeners: {
            boxready: function () {
                new FroalaEditor('#mytextareaid textarea', {
                    // height - padding - border
                    // height: 400 - 40 - 2,
                    width: '100%'
                }) // classic listener
            }
        }
    }]
});
