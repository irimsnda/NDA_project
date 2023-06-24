/**
 * Created by Softclans
 */
Ext.define('Admin.view.commoninterfaces.views.grids.OnlineApplicationGenerateInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'onlineapplicationgenerateinvoicesgrid',
    autoScroll: true,
    height: 450,
    controller: 'commoninterfacesVctr',
    frame: true,
    fieldDefaults: {
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },
	
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
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'applicationgenerateinvoicesgridstr',
                proxy: {
                    url: 'revenuemanagement/getOnlineAppNewInvoiceQuotation'
                }
            },
            isLoad: true
        }
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
            xtype: 'gridcolumn',
            text: 'Fee Type',
            flex: 1,
            dataIndex: 'fee_type',
        },{
            xtype: 'gridcolumn',
            text: 'Category',
            flex: 1,
            dataIndex: 'cost_category'
        },
        {
            xtype: 'gridcolumn',
            text: 'Sub Category',
            flex: 1,
            dataIndex: 'sub_category',
        },{
            xtype: 'gridcolumn',
            text: 'Cost Element',
            flex: 1,
            dataIndex: 'element',
         },{
            xtype: 'gridcolumn',
            text: 'Application Fee Type',
            flex: 1,
            dataIndex: 'cost_type',
         },{
            xtype: 'gridcolumn',
            flex: 1,
            text: 'Is Fast Track',
            dataIndex: 'is_fast_track',
            renderer: function (value, metaData) {
                if (value) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "True";
                }

                metaData.tdStyle = 'color:white;background-color:red';
                return "False";
            }
        },{
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'currency',
            text: 'Cost Currency',
        },{
            xtype: 'gridcolumn',
            text: 'Cost',
            flex: 1,
            dataIndex: 'cost'
    }],
     bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                module_id = grid.down('hiddenfield[name=module_id]').getValue();
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
                sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue();
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
               
                application_feetype_id = grid.down('hiddenfield[name=application_feetype_id]').getValue();
               
                fasttrack_option_id = grid.down('hiddenfield[name=fasttrack_option_id]').getValue();
               
                store.removeAll();
                store.getProxy().extraParams = {
                    module_id: module_id,
                    application_code: application_code,
                    sub_module_id: sub_module_id,
                    section_id: section_id,
                    application_feetype_id: application_feetype_id,
                    fasttrack_option_id: fasttrack_option_id
            };
            
        }
    },'->',{
        text: 'Generate Invoice',
        iconCls: 'x-fa fa-check-square',
       // name: 'savegenerate_invoice',
       // action: 'submit',
        formBind: true,
        ui: 'soft-purple',
        storeId:'applicationgenerateinvoicesgridstr',
        handler: 'funcInvoiceGenerateApplicationDetails',
        action_url: 'revenuemanagement/saveonlineapplicationreceiceinvoiceDetails'
    }]
});