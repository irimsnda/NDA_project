Ext.define('Admin.view.configurations.views.panels.PmsTCMeetingDecisionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmstcmeetingdecisions',
    title: 'PMS TC Meeting Decisions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmstcmeetingdecisionsGrid'
        }
    ]
});