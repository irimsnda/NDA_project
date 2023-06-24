Ext.define('Admin.view.configurations.views.panels.NarcoticsDrugTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'narcoticsdrugtypes',
    title: 'Narcotics Drug Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'narcoticsdrugtypesGrid'
        }
    ],

});
