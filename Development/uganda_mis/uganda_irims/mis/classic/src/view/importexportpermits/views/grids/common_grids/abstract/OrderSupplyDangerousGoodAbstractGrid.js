/**
 * Created by Softclans on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.abstract.OrderSupplyDangerousGoodAbstractGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'ordersupplydangerousgoodabstractgrid',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
   
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'summary',
        dock: 'bottom'
    }],
    initComponent: function () {
        var defaultColumns = [{
            xtype:'rownumberer'  
          },{
              xtype: 'gridcolumn',
              dataIndex: 'permitbrand_name', tdCls:'wrap-text',
              text: 'Drug Name',
              flex: 1
          }, {
              xtype: 'gridcolumn',
              dataIndex: 'controlled_drugssubstances',
              tdCls:'wrap-text',
              text: 'Drugs Substance',
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
              text: 'Quantity Ordered',
              flex: 1,
          },{   
            xtype: 'gridcolumn',
            dataIndex: 'permitprod_recommendation_id',
            tdCls:'wrap-text',
            text: 'Permits Product Recommendation(Acceptance)',
            flex: 1,
          },{   
            xtype: 'gridcolumn',
            dataIndex: 'permitprod_recommendation_remarks',
            tdCls:'wrap-text',
            text: 'Recommendation Remarks',
            flex: 1,
          }];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
