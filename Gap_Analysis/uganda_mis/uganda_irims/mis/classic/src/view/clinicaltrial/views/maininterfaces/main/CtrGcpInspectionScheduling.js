/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.maininterfaces.main.CtrGcpInspectionScheduling', {
    extend: 'Ext.panel.Panel',
    xtype: 'ctrgcpinspectionscheduling',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    layout: 'fit',
    items: [
        {
            xtype: 'ctrgcpinspectionschedulingpnl'
        }
    ]
});