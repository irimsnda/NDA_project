/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.disposalpermits.views.dashboard.DrugsOnlineDisposalApplications', {
    extend: 'Ext.Container',
    xtype: 'drugsonlinedisposalapplications',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 15
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'onlinedisposalapplicationsgrid',
            region: 'center',
            title: 'Online Application Submission',
            wizard_pnl: 'onlinedisposalapplicationswizard',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});