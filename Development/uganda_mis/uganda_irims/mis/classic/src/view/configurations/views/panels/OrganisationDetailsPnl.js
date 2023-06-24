Ext.define('Admin.view.configurations.views.panels.OrganisationDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'organisation_details',
    title: 'Zone Details',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'organisationdetailsGrid'
        }
    ]
});
