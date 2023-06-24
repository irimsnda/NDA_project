Ext.define('Admin.view.regional_assessment.views.forms.RegionalIntegrationUsersFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'regionalintegrationusersFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [ {
        xtype: 'hiddenfield',
        margi: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Country',
        margin: '0 20 20 0',
        name: 'country_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_countries'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'GMP Assessment Procedure',
        margin: '0 20 20 0',
        name: 'gmpassessment_procedure_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_gmp_assessment_types'
                        }
                    }
                   },
              isLoad: true
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Assessment Procedure',
        margin: '0 20 20 0',
        name: 'assessment_procedure_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_assessment_procedures'
                        }

                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Regional Authority',
        margin: '0 20 20 0',
        name: 'regional_authority_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_regional_authorities'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Telephone',
        margin: '0 20 20 0',
        name: 'telephone_no',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Postal Address',
        margin: '0 20 20 0',
        name: 'postal_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Email Address',
        margin: '0 20 20 0',
        name: 'email',
        allowBlank: false
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
        fieldLabel: 'Is Active',
        margin: '0 20 20 0',
        name: 'status_id',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    storeID: 'regionalintegrationusersStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'usermanagement/saveRegionalIntegrationUsers',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});