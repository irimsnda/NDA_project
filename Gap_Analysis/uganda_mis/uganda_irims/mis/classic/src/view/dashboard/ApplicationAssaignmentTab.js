Ext.define('Admin.view.dashboard.ApplicationAssaignmentTab', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationassignmenttab',
    margin: 2,
    height: Ext.Element.getViewportHeight() - 161,
    userCls: 'big-100 small-100',
    controller: 'dashboard',
    viewModel: {
        type: 'dashboard'
    },
    layout:{
        type: 'border'
    },
    defaults:{
        split: true,
        margin:1
    },
    title: 'Application Assignment',
    listeners: {
        hide: 'onHideView'
    }, 
    tbar:[{
        xtype: 'hiddenfield',
        name: 'group_id'
    }],
    items:[{
                
        xtype: 'applicationassaignmentcountergrid',
        region:'center'
        
    },{
        xtype: 'applicationassaigmentgrid',
        title:'Applications By Processes',
        region: 'south',
        collapsible: true,
        collapsed: true,
        height: 320,
        autoScroll: true
   }],
});
