Ext.define('Admin.view.configurations.views.panels.DistrictCouncilsDefination', {
    extend: 'Ext.panel.Panel',
    xtype: 'districtcouncilsdefination',
    title: 'Districts Councils Defination',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'districtcouncilsdefinationgrid'
        }
    ]
});
