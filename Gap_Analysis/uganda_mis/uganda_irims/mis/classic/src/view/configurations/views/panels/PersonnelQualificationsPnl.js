Ext.define('Admin.view.configurations.views.panels.PersonnelQualificationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'personnelQualifications',
    title: 'Personnel Position',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'personnelQualificationsGrid'
        }
    ]
});
