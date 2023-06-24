Ext.define('Admin.view.reports.appsreport.controlleddrugsreport.panel.ControlledDrugsReportPnl', {
   extend: 'Ext.panel.Panel',
    xtype: 'controlleddrugsreportpnl',
    margin: 2,
    layout: 'fit',
    defaults: {
        bodyPadding: '0 10 0 10',
        scrollable: true
        },
    items: [
         {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 12
        },{
            xtype: 'tabpanel',
             items: [{
                    xtype: 'importpermitreportpnl',
                    title: 'Import Permit Application(s)'
                },{
                    xtype: 'approvalcertificatereportpnl',
                    title: 'Controlled Drugs Certificate of Approval Application(s)'
             },{
                xtype: 'localsupplyreportpnl',
                title: 'Order for Supply of Dangerous Drugs Application(s)'
            }],
    }],


});