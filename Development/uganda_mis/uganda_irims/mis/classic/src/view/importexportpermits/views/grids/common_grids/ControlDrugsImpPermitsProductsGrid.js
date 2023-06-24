/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ControlDrugsImpPermitsProductsGrid', {
	extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'controldrugsimppermitsproductsgrid',
    itemId: 'controldrugsimppermitsproductsgrid',
    
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
        ui: 'soft-green',
        childXtype: 'controldrugsimppermitsproductsfrm',
        winTitle: 'Control Drugs Import Permit Products details',
        winWidth: '40%',
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

    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Impor/Export Permits Products',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('controldrugsimppermitsproductsgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'controldrugsimppermitsproductsstr',
                    proxy: {
                        url: 'importexportpermits/getControlledImpproductsDetails',
                        
                    }
            },
            isLoad: true
        }
    },
    columns: [{
              xtype: 'gridcolumn',
              dataIndex: 'permitbrand_name', tdCls:'wrap-text',
              text: 'Drug Name',
              flex: 1
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrugs_type',
              text: 'Drug Type',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'controlled_drugssubstances',
              tdCls:'wrap-text',
              text: 'Drugs Substance',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrugs_basesalt',
              
              text: 'Drugs Base Salt',
              flex: 1,
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'dosage_form',
              text: 'Dosage Form',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'product_strength',
              text: 'Product Strength',
              flex: 1,
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'strength_asgrams',
              text: 'Strength As Grams',
              flex: 1,
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'pack_unitdetails', 
              text: 'Pack Unit Details',
      
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'quantity',
              text: 'Quantity',
      
              flex: 1,
          },{
              
              xtype: 'gridcolumn',
              dataIndex: 'controlleddrug_base',
              text: 'Base (g)',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'currency_name',
              text: 'Currency Name',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'unit_price',
              text: 'Unit Price',
              flex: 1,
          },{
              xtype: 'gridcolumn',
              dataIndex: 'total_value',
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
                    childXtype: 'controldrugsimppermitsproductsfrm',
                    winTitle: 'Control Drugs Import Permit Products details',
                    winWidth: '60%',
                    handler: 'showEditProductOtherdetailWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_permits_products',
                    storeID: 'importexportpermitsproductsstr', 
                    action_url: 'productregistration/onDeleteProductOtherDetails',
                    action: 'actual_delete',
                    handler: 'doDeletePermitOtherdetails'
                }]
            }
        }
    }]
});
