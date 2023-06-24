Ext.define('Admin.view.promotionmaterials.views.forms.PromotionMaterialDetailsForm', {
    extend: 'Ext.form.Panel',
    xtype: 'promotionmaterialdetailsform',
    controller: 'promotionmaterialviewcontroller',
	
	 layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 1,
        margin: 5,
        labelAlign: 'top'
    },
    /* frame: true,
    layout: {
        type: 'form'
    }, */
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
                    fn: 'setWorkflowCombosStore',
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
        }, {
			xtype:'textarea',
			name:'remarks',
			colSpan:3,
			fieldLabel:'Remarks'
		}
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_promotion_materials_details',
            storeID: 'promotionmaterialdetailstr',
            action_url: 'promotionmaterials/insertUpdateProductParticulars',
            action: 'save_promotion_materials_other_details'
        }
    ]
});