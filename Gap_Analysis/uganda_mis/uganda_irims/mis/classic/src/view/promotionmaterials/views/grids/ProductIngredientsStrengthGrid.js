Ext.define('Admin.view.view.promotionmaterials.views.grids.ProductIngredientsStrengthGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productingredientsstrengthgrid',
	controller: 'promotionmaterialviewcontroller',
    store: 'productingredientstrengthstr',
	

	 
	tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },
	{
		
        xtype: 'button',
		disabled:true,
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name:'add',
        handler: 'genericGridShowWin',
        winTitle: 'Promotion Material Details',
        childXtype: 'productingredientstrengthform',
        winWidth: '35%',
		
        stores: '[]'/* ,
		bind:{disabled:'readOnly'} */
    }, {
        xtype: 'exportbtn'
    }],
	 bbar: [{
			xtype: 'pagingtoolbar',
			width: '100%',
			displayInfo: true,
			store: 'productingredientstrengthstr',
			displayMsg: 'Showing {0} - {1} of {2} total records',
			emptyMsg: 'No Records',
			      beforeLoad: function () {
             var store = this.store,
                grid = this.up('grid'),
                panel = grid.up('panel');
				product_id = panel.product_id;
			    store.getProxy().extraParams = {
                active_application_id:product_id 
            };  
        }
			
		}],
    listeners: {
        afterrender: function () {
            /* var store = this.store,
			product_id=this.up('grid').up('panel').product_id;
            store.removeAll();
            store.load({params:{active_application_id:product_id}}); */
        }
    },
    columns: [ 
	{
        xtype: 'gridcolumn',
        text: 'id',
		hidden:true,
        dataIndex: 'id'
        
    }, 
	{
        xtype: 'gridcolumn',
        text: 'Ingredinet',
        dataIndex: 'ingredient',
        flex: 1
    }, 
	{
        xtype: 'gridcolumn',
        text: 'Strength',
        dataIndex: 'strength',
        flex: 1
    }, 
	{
        xtype: 'gridcolumn',
        text: 'Remarks',
        dataIndex: 'remarks',
        flex: 1
    },
	{
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
                    tooltip: 'View Task',
                    action: 'edit',
                    handler: 'genericGridEditWin',
					url:'promotionmaterials/insertUpdateProductIngredinetsStrength',
					winTitle: 'Promotion Material Details',
					childXtype: 'productingredientstrengthform',
					winWidth: '35%',
					stores: '[]'/* ,
					bind:{disabled:'readOnly'} */
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name:'tra_promoadvert_products_ingred_strth',
                    storeID: 'productingredientstrengthstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecordFromIDComplex',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')/* ,
					bind:{disabled:'readOnly'} */
                }
                ]
            }
        }
    }
	
	
	]
});