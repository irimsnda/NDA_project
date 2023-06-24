/**
 * Created by softclans
 */
Ext.define('Admin.view.configurations.views.forms.ResearchOrgsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'researchOrgsFrm',
    controller: 'configurationsvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    scrollable: true,
    autoScroll: true,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'par_clinical_researchorganisations',
            allowBlank: true
        }, {
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
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
            xtype: 'textfield',
            fieldLabel: 'Telephone No',
            margin: '0 20 20 0',
            name: 'telephone_no',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            margin: '0 20 20 0',
            name: 'email',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            margin: '0 20 20 0',
            name: 'postal_address',
            allowBlank: false
        },{
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            margin: '0 20 20 0',
            name: 'physical_address',
            allowBlank: false
        }, {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
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
                },
                change: function (combo, newVal, oldVal, eopts) {
                    var form = this.up('form'),
                        store = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    store.removeAll();
                    store.load({params: {filters: filterStr}});
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_regions'
                            }
                        }
                    },
                    isLoad: false
                }
            }
        }
    ],
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
                    table_name: 'par_clinical_researchorganisations',
                    storeID: 'researchOrgsGridStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});