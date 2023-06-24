
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.RetentionChargesInvoicesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'retentionchargesinvoicespnl',
    itemId: 'retentionchargespnl',
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
                        storeId: 'retentionapplicantsselectiongrdstr'
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
                childXtype:'retentionsapplicantselectiongrid',
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
            fieldLabel: 'Section',
            xtype:'combo',
            labelAlign: 'top',
            width: 150, 
            valueField:'id',
            displayField:'name',
            name: 'section_id',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                    var store=this.getStore();
                    
                    var all={name: 'All',id:0};
                      store.insert(0, all);
                    },
                afterrender: function(combo) {
                            combo.select(combo.getStore().getAt(0));	
                        }
    
            }
        },{
            fieldLabel: 'Retention Status',
            xtype:'combo',
            valueField:'id',
            displayField:'name',
            labelAlign: 'top',
            width: 150,
            name: 'retention_status_id',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_retention_statuses'
                        }
                       }
                    },
                    isLoad: true
                },beforequery: function() {
                    var store=this.getStore();
                    
                    var all={name: 'All',id:0};
                      store.insert(0, all);
                    },
                afterrender: function(combo) {
                            combo.select(combo.getStore().getAt(0));	
                }
    
            }
        },{
            text: 'Filter',
            iconCls:'x-fa fa-search',
            margin: 5,ui:'soft-green',
            handler: 'funcFIlterRetentionInvoicesDetails'
        },{
            text: 'Clear',
            iconCls:'x-fa fa-cancel',
            margin: 5,
            ui:'soft-red',
            handler: 'funcClearPayentFIlterBillsDetails'
        }],
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 200, remoteFilter: true,
                    storeId: 'retentionchargesinvoicesgridstr',
                    totalProperty:'totals',
                    groupField:'module_name',
                    proxy: {
                        url: 'revenuemanagement/getRetentionChargesInvoicesdetails',
                        reader: {
                            type: 'json',
                            totalProperty: 'totals'
                        },
                    }
                },
                isLoad: false
            }
        }, 
            xtype: 'retentionchargesinvoicesgrid',

            title: 'Product Retention Invoices',
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
        text: 'Print Retention Statements',
        iconCls:'x-fa fa-print',
        margin: 5,ui:'soft-green',
        handler: 'funcPrintRetentionInvoiceStatement'
    },{
        xtype:'textfield',
        readOnly: true,
        hidden: true,
        fieldLabel:'Total Amount',
        labelAlign: 'right',
        name: 'retentiontotal_amount'
    }]
});