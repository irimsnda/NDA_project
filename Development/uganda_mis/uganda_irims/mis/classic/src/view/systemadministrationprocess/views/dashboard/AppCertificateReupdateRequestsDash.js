/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/22/2018.
 */
Ext.define('Admin.view.systemadministrationprocess.views.dashboards.AppCertificateReupdateRequestsDash', {
    extend: 'Ext.Container',
    xtype: 'appcertificatereupdaterequestsdash',
    layout: 'fit',
    items: [
        {
            xtype: 'appcertificatereupdaterequestsgrid',
            region: 'center',
            title: 'Application Certificate/Permit Update Requests',
            margin: 2
        }
    ]
});