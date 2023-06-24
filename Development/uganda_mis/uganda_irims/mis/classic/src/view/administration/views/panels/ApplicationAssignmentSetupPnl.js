Ext.define('Admin.view.configurations.views.panels.ApplicationAssignmentSetupPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationassignmentsetuppnl',
    title: 'Application Assignment Setup',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

   layout:{
        type: 'border'
    },
    defaults:{
        split: true,
        margin:1
    },
    items: [{
        xtype: 'applicationassignmentgrouplistgrid',
        region: 'west'
    },{
        xtype: 'applicationassignmentprocesslistgrid',
        region: 'center'
    }],

});
