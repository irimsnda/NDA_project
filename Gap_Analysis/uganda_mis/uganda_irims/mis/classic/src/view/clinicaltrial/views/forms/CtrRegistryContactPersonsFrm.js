/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryContactPersonsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistrycontactpersonsfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true
    },
    autoScroll: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            /*
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
            */
        }
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'id'
        }, {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Role',
            name: 'contactperson_role_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicaltrialpersons_roles'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Full Names',
            name: 'name',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone Number',
            name: 'phone_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email_address'
        }, {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    regionStore.removeAll();
                    regionStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
            
        },{
            xtype:'textfield',
            name:'postal_address',
            fieldLabel:'Postal Address' 
        },{
            xtype:'textfield',
            name:'contact_personposition',
            fieldLabel:'Contact Person Position'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/onSaveContactPersonDetails',
            table_name: 'tra_clinicaltrial_contactpersons',
            storeID: 'onlineclinicaltrialcontactpersongridstr',
        }
    ]
});