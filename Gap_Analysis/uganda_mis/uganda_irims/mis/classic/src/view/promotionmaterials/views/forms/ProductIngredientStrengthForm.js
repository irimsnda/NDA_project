Ext.define('Admin.view.promotionmaterials.views.forms.ProductIngredientStrengthForm', {
    extend: 'Ext.form.Panel',
    xtype: 'productingredientstrengthform',
    controller: 'promotionmaterialviewcontroller',

/*  	 layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },
  
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_promotion_materials_details'
        },
       
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
   
		 {
            xtype: 'combo',
            fieldLabel: 'Promotion Materials',
            name: 'material_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_promotion_material_items'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, 
		
		
		
		{
			xtype:'textarea',
			name:'remarks',
			colSpan:3,
			fieldLabel:'Remarks'
		}
    ],
    buttons: [

		  {
				xtype: 'button',
				text: 'Save',
				ui: 'soft-purple',
				iconCls: 'x-fa fa-save',
				formBind: true,
				table_name: 'tra_promotionaladvert_personnel',
				storeID: 'promotionmaterialproductparticularstr',
				action_url: 'promotionmaterials/insertUpdateProductIngredinetsStrength',
				action:'save'
				
			}, 
			{
				xtype: 'button',
				text: 'Clear',
				ui: 'soft-purple',
				iconCls: 'x-fa fa-close',
				handler: function () {
					this.up('form').getForm().reset();
				}
			}
    ]  
	 */
 	 layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },

    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_promoadvert_products_ingred_strth'
        },
       
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
   
        {
			xtype:'textfield',
			name:'ingredient',
			fieldLabel:'Ingredient'
		},
		{
			xtype:'textfield',
			name:'strength',
			fieldLabel:'Strength'
		},
		
		{
			xtype:'textarea',
			name:'remarks',
			colSpan:3,
			fieldLabel:'Remarks'
		}
    ],
    buttons: [
				{
						xtype: 'button',
						text: 'Save',
						ui: 'soft-purple',
						iconCls: 'x-fa fa-save',
						formBind: true,
						table_name: 'tra_promotionaladvert_personnel',
						storeID: 'promotionmaterialproductparticularstr',
						action_url: 'promotionmaterials/insertUpdateProductIngredinetsStrength',
						action:'save'
						
					}, 
					{
						xtype: 'button',
						text: 'Clear',
						ui: 'soft-purple',
						iconCls: 'x-fa fa-close',
						handler: function () {
							this.up('form').getForm().reset();
						}
					}
        /* {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_promoadvert_products_ingred_strth',
            storeID: 'productingredientstrengthstr',
            url: 'promotionmaterials/insertUpdateProductIngredinetsStrength',
            action: 'save'
        } */
    ]   
});