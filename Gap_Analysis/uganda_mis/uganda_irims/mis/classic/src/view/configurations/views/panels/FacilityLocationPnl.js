Ext.define('Admin.view.configurations.views.panels.FacilityLocationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'facilityLocation',
    title: 'Assessment Procedure',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'facilityLocationGrid'
        }
    ]
});
