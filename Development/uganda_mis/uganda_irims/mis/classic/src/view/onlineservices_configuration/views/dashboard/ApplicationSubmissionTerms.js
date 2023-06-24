/**
 * Created by Softclans on 9/28/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.dashboard.ApplicationSubmissionTerms', {
    extend: 'Ext.container.Container',
    xtype: 'applicationsubmissionterms',
    controller: 'onlineservicesconfVctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'applicationsubmissiontermspnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
