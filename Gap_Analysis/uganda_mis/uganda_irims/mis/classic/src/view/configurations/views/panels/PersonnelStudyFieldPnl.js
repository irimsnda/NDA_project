Ext.define('Admin.view.configurations.views.panels.PersonnelStudyFieldPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'personnelStudyField',
    title: 'Personnel Study Field',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'personnelStudyFieldGrid'
        }
    ]
});
