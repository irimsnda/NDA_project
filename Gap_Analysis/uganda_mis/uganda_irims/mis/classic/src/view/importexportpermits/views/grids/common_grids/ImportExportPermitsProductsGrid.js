/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPermitsProductsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'importexportpermitsproductsgrid',
    itemId: 'importexportpermitsproductsgrid',
    
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
               // return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Permit Products Details',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        name: 'add_products',
        ui: 'soft-green',
        childXtype: 'importexportpermitsproductspnl',
        winTitle: 'Add Permit Products Details',
        winWidth: '80%',
        handler: 'showAddImpPermitProductsWinFrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'isReadOnly',
        bind: {
            value: '{isReadOnly}'  // negated
        }
    }],
    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('importexportpermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local',
        position: 'bottom',
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
                selModel: {
                    selType: 'checkboxmodel',
                    mode: 'MULTI'
                },
                features: [{
                    ftype: 'searching',
                    minChars: 2,
                    position: 'bottom',
                    mode: 'local'
                }], 
                plugins: [{
                    ptype: 'gridexporter'
                }, {
                    ptype: 'cellediting',
                    clicksToEdit: 3,
                    editing: false
                },{
                    ptype: 'filterfield'
                }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'importexportpermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getImportexportpermitsproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype:'rownumberer'  
      },{
          xtype: 'gridcolumn',
          dataIndex: 'brand_name',
          tdCls: 'wrap-text',
          text: 'Brand Name/Device Name',
          flex: 1
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'certificate_no',
          tdCls: 'wrap-text',
          text: 'Certificate No',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'common_name',
          tdCls: 'wrap-text',
          text: 'Common Name',
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'product_category',
          hidden: true,
          tdCls: 'wrap-text',
          text: 'Product Category',
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'quantity',
          tdCls: 'wrap-text',
          text: 'Quantity',
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'packaging_units',
          tdCls: 'wrap-text',
          text: 'Packaging Units',
          flex: 1,
      }, {
          xtype: 'gridcolumn',
          dataIndex: 'pack_size',hidden: true,
          text: 'Unit Pack size',
  
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'pack_unit',hidden: true,
          text: 'Unit Pack',
  
          flex: 1,
      },{
          xtype: 'gridcolumn',
          dataIndex: 'currency_name',
          tdCls: 'wrap-text',
          text: 'Currency Name',
          flex: 1,
      },{
          
          xtype: 'gridcolumn',
          dataIndex: 'unit_price',
          tdCls: 'wrap-text',
          text: 'Unit Price',
          flex: 1,
        
      },{
          xtype: 'gridcolumn',
          dataIndex: 'total_value',
          tdCls: 'wrap-text',
          text: 'Total Value',
          width: 200,
          summaryType: 'sum',
          renderer: function (val, meta, record) {
              return Ext.util.Format.number(val, '0,000.00');
          },
          summaryRenderer: function (val) {
              val = Ext.util.Format.number(val, '0,000.00');
              return 'Total Fob '+val
          }
      },{
        xtype: 'gridcolumn',
        text: 'Registration Status', 
        tdCls: 'wrap-text',
        dataIndex: 'certificate_no',
        renderer: function (value, metaData) {
            if (value !='') {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Registered/Authorised";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Not Registered";
        }

    },{   
        xtype: 'gridcolumn',
        dataIndex: 'prodregistrationvalidation_recommendation_id',
        tdCls:'wrap-text',
        text: 'Product Registration Validation Recommendation',
        flex: 1,
            renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                var textVal = '';
               
                if (val == 2) {
                    textVal = "Accepted for Importation";
                    meta.tdStyle = 'color:white;background-color:green';
                    
                }else if(val == 3){
                    meta.tdStyle = 'color:white;background-color:red';
                    textVal = "Rejected for Importation";
                }else{
                   // meta.tdStyle = 'color:white;background-color:blue';
                }
                return textVal;
            }
      },{   
        xtype: 'gridcolumn',
        dataIndex: 'prodregistrationvalidation_recommendation_remarks',
        tdCls:'wrap-text',
        text: 'Product Registration Validation Recommendation',
        flex: 1,
        renderer: function (val) {
            if (val == '') {
               
                     var val = 'Recommendation Remarks';
            }
            return val;
        }
      },{   
        xtype: 'gridcolumn',
        dataIndex: 'permitprod_recommendation_id',
        tdCls:'wrap-text',
        text: 'Permits Product Recommendation(Acceptance)',
        flex: 1,
            editor: {
                xtype: 'combo',
                store: 'permitprod_recommendationstr',
                valueField: 'id',
                displayField: 'name',
                queryMode: 'local',
                listeners: {
                   
                }
            },
            renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
                var textVal = 'Select Recommendation';
                if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                    textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
                }
                if (val == 2) {
                    meta.tdStyle = 'color:white;background-color:green';
                    
                }else if(val == 3){
                    meta.tdStyle = 'color:white;background-color:red';
                   
                }else{
                    meta.tdStyle = 'color:white;background-color:blue';
                }
                
                return textVal;
            }
      },{   
        xtype: 'gridcolumn',
        dataIndex: 'permitprod_recommendation_remarks',
        tdCls:'wrap-text',
        text: 'Recommendation Remarks',
        flex: 1,
        editor: {
            xtype:'textfield'
        },renderer: function (val) {
            if (val == '') {
               
                     var val = 'Recommendation Remarks';
            }
            return val;
        }
      },{
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    childXtype: 'importexportpermitsproductsfrm',
                    winTitle: 'Import/Export Permit Products details',
                    winWidth: '80%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_permits_products',
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    },
                    storeID: 'importexportpermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }]
            }
        }
    }]
});
