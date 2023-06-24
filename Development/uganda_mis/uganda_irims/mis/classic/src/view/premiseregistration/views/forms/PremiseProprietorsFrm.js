Ext.define('Admin.view.premiseregistration.views.forms.PremiseProprietorsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseproprietorsfrm',
    height: Ext.Element.getViewportHeight() - 118,
    controller: 'configurationsvctr',
    autoScroll: true,
    scrollable: true,
    layout: 'column',
    frame: true,
    defaults: {
        labelAlign: 'top',
        columnWidth: 0.5,
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 20',
        name: 'table_name',
        value: 'tra_premises_proprietors',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 20',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 20',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'premise_id',
        margin: '0 20 20 20',
        name: 'premise_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'module_id',
        margin: '0 20 20 20',
        name: 'module_id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'manufacturing_site_id',
        margin: '0 20 20 20',
        name: 'manufacturing_site_id',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 20',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Telephone',
        margin: '0 20 20 20',
        name: 'telephone_no',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Email',
        margin: '0 20 20 20',
        name: 'email_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Residential Address',
        margin: '0 20 20 20',
        name: 'physical_address',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Occupation',
        margin: '0 20 20 20',
        name: 'occupation',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Nationality',
        margin: '0 20 20 20',
        name: 'nationality_id',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
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
        fieldLabel: 'Identification Type',
        margin: '0 20 20 20',
        name: 'identification_type_id',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_identification_types'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Identification No',
        margin: '0 20 20 20',
        name: 'identification_no',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Sex',
        margin: '0 20 20 20',
        name: 'sex_id',
        allowBlank: false,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_gender'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    }
    ,{
        xtype: 'datefield',
        fieldLabel: 'Date of Birth',
        margin: '0 20 20 20',
        name: 'dob',
        format: 'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Convicted of an offence in the past five (5) years',
        margin: '0 20 20 20',
       // fieldWidth: 300,
        name: 'had_offence',
        columnWidth: 1,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldValue, eopts) {
                if(newVal == 1){
                    var form = combo.up('form'),
                        offence = form.down('htmleditor[name=offence]');
                    offence.setVisible(true);
                    offence.allowBlank = false;
                    offence.validate();
                }else{
                    var form = combo.up('form'),
                        offence = form.down('htmleditor[name=offence]');
                    offence.setVisible(false);
                    offence.allowBlank = true;
                    offence.validate();
                }
                
            }
           
        }
    },{
        xtype: 'htmleditor',
        fieldLabel: 'Offence',
        margin: '0 20 20 20',
        columnWidth: 1,
        name: 'offence',
        hidden: true,
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'License Denied or Revoked Before',
        margin: '0 20 20 20',
       // fieldWidth: 300,
       columnWidth: 1,
        name: 'had_license_revoke_denied',
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldValue, eopts) {
                if(newVal == 1){
                    var form = combo.up('form'),
                        lic_deniedrevoked_reason = form.down('htmleditor[name=lic_deniedrevoked_reason]');
                    lic_deniedrevoked_reason.setVisible(true);
                    lic_deniedrevoked_reason.allowBlank = false;
                    lic_deniedrevoked_reason.validate();
                }else{
                    var form = combo.up('form'),
                        lic_deniedrevoked_reason = form.down('htmleditor[name=lic_deniedrevoked_reason]');
                    lic_deniedrevoked_reason.setVisible(false);
                    lic_deniedrevoked_reason.allowBlank = true;
                    lic_deniedrevoked_reason.validate();
                }
                
            }
           
        }
    },{
        xtype: 'htmleditor',
        fieldLabel: 'Reason for Denial/Revoked',
        margin: '0 20 20 20',
        columnWidth: 1,
        name: 'lic_deniedrevoked_reason',
        hidden: true,
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
                    table_name: 'tra_premises_proprietors',
                    storeID: 'premiseproprietorsdetailsstr',
                    formBind: true,
                    name: 'save_btn',
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});