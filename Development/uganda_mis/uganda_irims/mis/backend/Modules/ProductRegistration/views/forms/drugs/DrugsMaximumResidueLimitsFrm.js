
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.DrugsMaximumResidueLimitsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugsMaximumResidueLimitsFrm',
    
    layout: {
        type: 'vbox'
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'top',
        width: '100%',
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },
    {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_drugs_maximum_residuelimits'
    },{
        xtype: 'combo',
        name: 'target_species_id',
        allowBlank: true,
        fieldLabel: 'Target Species',
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            afterrender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_target_species'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'textfield',
        name: 'tissue',
        fieldLabel:'Tissue'
    }, {
        xtype: 'textfield',
        name: 'maximum_residue_limits',
        fieldLabel:'Maximum Residue Limits'
    }, 
    {
        xtype: 'textfield',
        name: 'reference',
        fieldLabel: 'Reference (Codex, EU,…) '
    }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            '->', {
                text: 'Save Maximum Residue Limits',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_drugs_maximum_residuelimits',
                storeID: 'drugsMaximumResidueLimitsstr',
                formBind: true,
                ui: 'soft-purple',
                action_url: 'productregistration/onSaveProductOtherDetails',
                handler: 'saveproductOtherdetails'
            }
        ]
    }
    ]
});