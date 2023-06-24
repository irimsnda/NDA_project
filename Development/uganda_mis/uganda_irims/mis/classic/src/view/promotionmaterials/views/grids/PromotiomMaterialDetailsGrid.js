Ext.define('Admin.view.view.promotionmaterials.views.grids.PromotioMaterialDetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'promotionmaterialdetailsgrid',
   
	tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        handler: 'showPromotionMaterialDetailsForm',
        winTitle: 'Promotion Material Details',
        childXtype: 'promotionmaterialdetailsform',
        winWidth: '35%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
	 bbar: [{
			xtype: 'pagingtoolbar',
			width: '100%',
			displayInfo: true,
			displayMsg: 'Showing {0} - {1} of {2} total records',
			emptyMsg: 'No Records',
			      beforeLoad: function () {
                    this.up('promotionmaterialdetailsgrid').fireEvent('refresh', this);
        }
			
		}],
    
    columns: [ 
	{
        xtype: 'gridcolumn',
        text: 'Promotion Material',
        dataIndex: 'promotion_material_name',
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
                    handler: 'editPromotionMaterialDetails',
                    stores: '[]'
					
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_promotion_materials_details',
                    storeID: 'promotionmaterialdetailsgridstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecord'
					
                }
                ]
            }
        }
    }
	
	
	]
});