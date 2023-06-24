
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.RetentionChargesPaymentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'retentionchargespaymentspnl',
    itemId: 'retentionchargespaymentpnl',
    layout: 'border',
    items: [{
            xtype: 'grid',
            name: 'retentionapplicantsselectiongrd',
            region: 'west',
            collapsible: true,
            width: 250,split: true,
            title: 'Applicants Selection',
            listeners: {
                beforerender: {
                    fn: 'setConfigGridsStore',
                    config: {
                        pageSize: 200, remoteFilter: true,
                        storeId: 'retentionapplicantsselectiongrdstr',
                        
                    },
                    isLoad: false
                }
            }, bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                beforeLoad:function(){
                      return false;
                }
            }],
            tbar:[{
                text: 'Search',
                iconCls:'x-fa fa-search',
                margin: 5,
                ui:'soft-green',
                childXtype:'retentionsapplicantpaymentselectiongrid',
                winTitle: 'Applicants Details',
                winWidth: '80%',
                handler: 'funcsearchtraderDetailswin'

            },{
                text: 'Clear',
                iconCls:'x-fa fa-times',
                margin: 5,
                ui:'soft-red',
                handler: 'funcClearretentionapplicantsselection'
            }],
            columns:[{
                header: 'Trader Name',
                dataIndex: 'name',
                flex: 1
            },{
                header: 'Trader No',
                dataIndex: 'identification_no',
                flex: 1
            },{
                header: 'Country',
                dataIndex: 'country_name',
                flex: 1
            }]
    },{
        //title: 'Product retention Invoices',
        region: 'center',
        tbar:[{
            fieldLabel: 'Retention Year From',
            xtype:'combo',
            store: 'year_store',
            labelAlign: 'top',
            width: 150, valueField:'years',
            displayField:'years',
            name: 'retention_yearfrom'
        },{
            fieldLabel: 'Retention Year To',
            xtype:'combo',
            store: 'year_store',
            labelAlign: 'top',
            valueField:'years',
            displayField:'years',
            width: 150,
            name: 'retention_yearto'
        },{
            fieldLabel: 'Payment Date From',
            xtype:'datefield',
            name: 'trans_datefrom',
            labelAlign: 'top',
            
        },{
            fieldLabel: 'Payment Date To',
            xtype:'datefield',
            name: 'trans_dateto',
            labelAlign: 'top'
        },{
            text: 'Filter',
            iconCls:'x-fa fa-search',
            margin: 5,ui:'soft-green',
            handler: 'funcFIlterRetentionPaymentsDetails'
        },{
            text: 'Clear',
            iconCls:'x-fa fa-cancel',
            margin: 5,
            ui:'soft-red',
            handler: 'funcClearRetentionPayentFIlterBillsDetails'
        }],
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 200, remoteFilter: true,
                    storeId: 'retentionchargespaymentsgridstr',
                    totalProperty:'totals',
                    groupField:'module_name',
                    proxy: {
                        url: 'revenuemanagement/getRetentionChargesPaymentsdetails',
                        reader: {
                            type: 'json',
                            totalProperty: 'totals'
                        },
                    }
                },
                isLoad: false
            }
        }, 
            xtype: 'retentionchargespaymentsgrid',
            title: 'Product Retention Payments',
            bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                beforeLoad:function(){
                      this.up('grid').fireEvent('refresh', this);
                }
            }]
        }
    ],bbar: ['->',{
        text: 'Print Payment Statements',
        iconCls:'x-fa fa-print',
        margin: 5,ui:'soft-green',
        handler: 'funcPrintRetentionPaymentsStatement'
    }]
});