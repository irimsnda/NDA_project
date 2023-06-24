/**
 * Created by Kip on 2/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationGenerateInvoicesPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'applicationgenerateinvoicespnl',
    layout:'fit',
    tbar: [{
        xtype: 'hiddenfield',
        name: 'application_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'process_id'
    }, {
        xtype: 'hiddenfield',
        name: 'module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    }, {
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_feetype_id',
    }, {
        xtype: 'hiddenfield',
        name: 'fasttrack_option_id',
    }, {
        xtype: 'hiddenfield',
        name: 'query_id',
    }],
    items: [
        {
            xtype: 'applicationgenerateinvoicesgrid',
            title: 'System Auto Proforma Invoice Generation'
        },{
            title: 'System Manual Proforma Invoice Generation',
            height: 500,
            autoScroll: true,
            xtype: 'appinvoicemanualgenerationpnl'
        }
    ]
});