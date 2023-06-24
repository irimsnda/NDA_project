/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.CtrGcoInspectionScheduleApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'ctrgcoinspectionscheduleapproval',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    items: [
        {
            xtype: 'ctrgcpinspectionschedulingpnl'
        }
    ]
});

