/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductAuditingCheckGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.ProductsScreeningGrid',
    xtype: 'productAuditingCheckGrid',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Detail',
		tdCls:'wrap-text',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pass_status',
        text: 'Evaluators Pass Status',
        align: 'center',
        width: 120,
        editor: {
            xtype: 'combo',
            store: 'confirmationstr',
            valueField: 'id',
            displayField: 'name',
            queryMode: 'local',
            readOnly: true
        },
        renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
            var textVal = '';
            if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
                textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
            }
            return textVal;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'observation',
		tdCls:'wrap-text',
        text: 'Evaluator\'s Comment',
        flex: 1
    },,
    {
       xtype: 'gridcolumn',
       dataIndex: 'auditorpass_status',
       text: 'Auditor Pass Status',
       align: 'center',     tdCls: 'wrap-text',   
       tdcls: 'editor-text',
       width: 120,
       editor: {
           xtype: 'combo',
           store: 'confirmationstr',
           valueField: 'id',
           displayField: 'name',
           queryMode: 'local',
           listeners: {
               //change: 'saveApplicationScreeningDetails'
           }
       },
       filter: {
           xtype: 'combo',
           store: 'confirmationstr',
           queryMode: 'local',
           valueField: 'id',
           displayField: 'name'
       },
       renderer: function (val, meta, record, rowIndex, colIndex, store, view) {
           var textVal = 'Select Status';
           if (view.grid.columns[colIndex].getEditor().getStore().getById(val)) {
               textVal = view.grid.columns[colIndex].getEditor().getStore().getById(val).data.name;
           }
           return textVal;
       }
   },  {
        xtype: 'gridcolumn',
        dataIndex: 'auditor_comment',
        text: 'Auditor\'s Comment',
        flex: 1,
		 tdCls: 'wrap-text',   
		   editor: {
				xtype: 'textarea'
			}
    }]

});