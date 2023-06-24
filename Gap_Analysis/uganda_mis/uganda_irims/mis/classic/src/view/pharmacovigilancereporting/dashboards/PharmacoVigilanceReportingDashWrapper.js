/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.dashboards.PharmacoVigilanceReportingDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'pharmacovigilancereportingdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'pharmacovigilancereportingdash'
        }
    ]
});