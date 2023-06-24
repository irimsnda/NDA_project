Ext.define('Admin.view.view.promotionmaterials.views.grids.PromotiomMaterialProductGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'promotiommaterialproductgrid',
    
	tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
		
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        handler: 'showPromotionMaterialProductForm',
        winTitle: 'Product Particulars',
        childXtype: 'promotionmaterialproductparticularsform',
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
            this.up('promotiommaterialproductgrid').fireEvent('refresh', this); 
        }
    }],
    listeners: {
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        text: 'Brand Name(Product Name)',
        dataIndex: 'brand_name',
        flex: 1
    },  
	{
        xtype: 'gridcolumn',
        text: 'Generic Name',
        dataIndex: 'common_name',
        flex: 1
    }, 
	
	{
        xtype: 'gridcolumn',
        dataIndex: 'is_registered',
        text: 'Is Registered',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Registration No',
        dataIndex: 'registration_no',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        text: 'Registrant',
        dataIndex: 'registrant_name',
        flex: 1
    }, 
	
	{
        xtype: 'gridcolumn',
        text: 'Other Details',
        dataIndex: 'other_details',
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
                    handler: 'editPromotionMaterialProductForm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_promotion_prod_particulars',
                    storeID: 'promotiommaterialproductgridstr',
                    action_url: 'promotionmaterials/genericDeleteRecord',
                    action: 'actual_delete',
                    handler: 'deleteRecord',
				
                }
                ]
            }
        }
    }
	]
});