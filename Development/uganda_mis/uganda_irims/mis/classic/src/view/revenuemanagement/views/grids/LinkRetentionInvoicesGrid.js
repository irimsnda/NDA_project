/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.LinkRetentionInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'linkretentioninvoicesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height:550,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var batch_invoice_id = record.get('batch_invoice_id');
            if (batch_invoice_id >0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }, select: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                    selCount = grid.getSelectionModel().getCount();
                if (selCount > 0) {
                    grid.down('button[name=btnlinkinvoices]').setDisabled(false);
                }
            },
            beforeselect: function (sel, record, index, eOpts) {
                var batch_invoice_id = record.get('batch_invoice_id'),
                    grid = sel.view.grid;
                if (batch_invoice_id > 0 ) {
                    
                        toastr.warning('The Invoice Has already Been Linked to another Batch!!', 'Warning Response');
                        return false;
                    
                } else {
                    return true;
                }
            },
            deselect: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                    selCount = grid.getSelectionModel().getCount();
                if (selCount < 1) {
                    grid.down('button[name=btnlinkinvoices]').setDisabled(true);
                }
            },
        }
    },

    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    tbar:[{
        xtype:'textfield',
        fieldLabel:'Trader Name',
        name:'trader_name',
        labelAlign:'top'
    },{
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
        text: 'Filter',
        iconCls:'x-fa fa-search',
        margin: 5,ui:'soft-green',
        handler: 'funcFIlterRetentionInvoicesDetails'
    },{
        text: 'Clear',
        iconCls:'x-fa fa-cancel',
        margin: 5,
        ui:'soft-red',
        handler: 'funcClearRetentionLinkDetails'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200, remoteFilter: true,
                storeId: 'linkapplicationinvoicesgridstr',
                totalProperty:'totals',
                proxy: {
                    url: 'revenuemanagement/getRetentionPendingInvoicesdetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'retention_year',
        text: 'Retention Year',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Date Of Invoicing',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_element',
        text: 'Cost Description',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',
        text: 'Invoice Amount',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        flex: 1
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Print Invoice',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationInvoice'
                }]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        emptyMsg: 'No Records',
            beforeLoad:function(){
                this.up('grid').fireEvent('refresh', this);
            }
       
    },{
        name:'btnlinkinvoices',
        text:'Link Invoices',
        disabled:true,
        storeId:'batchapplicationinvoicesgridstr',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green'
    }]
});
