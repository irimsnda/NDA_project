/**
 * created by TMDA team
 * user Dr. Masuke and Eng. Sadam 
 * 
 * created on 21/05/2021
 */
 Ext.define('Admin.view.productrecallalert.views.grids.AllProductRecallBatchesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'allproductrecallbatchessgrid',
    controller: 'productRecallAlertVctr',
    height: Ext.Element.getViewportHeight() - 118,

    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            /*var batch_invoice_id = record.get('batch_invoice_id');
            if (batch_invoice_id >0) {
                return 'invalid-row';
            }*/
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }, 
            select: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                    selCount = grid.getSelectionModel().getCount();
                    if (selCount > 0) {
                        grid.down('button[name=btnselectbatches]').setDisabled(false);
                    }
            },
            beforeselect: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                selectedItems = grid.getSelectionModel().getSelection();

                //get the about to select record
                var currentRecBatchArray = record.get('batch_numbers').split(',');
                var eachSelectedRecBatchArray = new Array();
                var exists = true;

                Ext.each(selectedItems, function (item) {
                    eachSelectedRecBatchArray =  item.data.batch_numbers.split(','); 

                    eachSelectedRecBatchArray.forEach( function (batch) {
                        if(!currentRecBatchArray.includes(batch)){
                            exists = false;
                        }
                    });
                });                
                
                if (!exists) {  
                    grid.down('button[name=btnselectbatches]').setDisabled(true);                  
                    toastr.error('Select Only atlest Batch!!', 'Warning Response');
                    return false;                    
                }
            },
            deselect: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                selectedItems = grid.getSelectionModel().getSelection();

                //get the about to select record
                var currentRecBatchArray = record.get('batch_numbers').split(',');
                var eachSelectedRecBatchArray = new Array();
                var exists = true;

                Ext.each(selectedItems, function (item) {
                    eachSelectedRecBatchArray =  item.data.batch_numbers.split(','); 

                    eachSelectedRecBatchArray.forEach( function (batch) {
                        if(!currentRecBatchArray.includes(batch)){
                            exists = false;
                        }
                    });

                });                
                
                if (!exists) {  
                    grid.down('button[name=btnselectbatches]').setDisabled(true);                  
                    toastr.error('Select Only atlest Batch!!', 'Warning Response');
                    return false;                    
                }else{
                    var selCount = grid.getSelectionModel().getCount();
                    if (selCount < 1) {
                        grid.down('button[name=btnselectbatches]').setDisabled(true);
                    }else{
                        grid.down('button[name=btnselectbatches]').setDisabled(false);
                    }
                }
            },
        }
    },
    tbar: [{
        text: 'Double Click to select a recalled product batch'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tra_poe_permitsdata_id',
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'batch_numbers',
        text: 'Batch Numbers',
        width:150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width:150
    },{
        xtype: 'gridcolumn',
        dataIndex: 'poe_prod_quantity',
        text: 'PORT Quantity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'packaging_unit',
        text: 'Packaging Unit',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_date',
        text: 'Consignment Date',
        flex: 1
    }],

    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 50,
                storeId: 'allproductbatchstr',
                remoteFilter: true,
                enablePaging: true,
                proxy: {
                    url: 'api/thscp/getAllRecallProductBatches'
                }
            },
            isLoad: true
        },
    },    
    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [{
            ptype: 'filterfield'
        }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore();
            var wrapper = Ext.ComponentQuery.query("#productRecallAlertCtn")[0],
                form_wrapper = wrapper.down('#productRecallAlertDashWrapper'),
                product_recall_form = form_wrapper.down('#ProductRecallAlertFrm');    
       
            var product_id = product_recall_form.down('hiddenfield[name=product_id]').getValue();

            store.getProxy().extraParams = {
                section_id: 2,
                product_id: product_id
            };
        }
    },'->',{
        name:'btnselectbatches',
        text:'Add Selected Batches',
        disabled:true,
        storeId:'batchapplicationinvoicesgridstr',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green'
    }]
});