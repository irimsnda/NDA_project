Ext.define('Admin.view.configurations.views.panels.PmsProgramDetails', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsprogramdetails',
    title: 'PMS Program Details',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsprogramdetailsGrid'
        }
    ]
});