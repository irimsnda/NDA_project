/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.AddSenderReceiverDetailsfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'addsenderreceiverdetailsfrm',
    itemId: 'addsenderreceiverdetailsfrm',
    title: 'Sender/Receiver Details',
    controller: 'configurationsvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top'
    },
    items: [{
      xtype:'hiddenfield',
      name:'id'  
        
    },{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_permitsenderreceiver_data',
        allowBlank: true
    },
        
        {
            xtype: 'textfield',
            name: 'name',
            allowBlank: false,
           fieldLabel:'Name',
        },
       
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',allowBlank: false,
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
           
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/country'
                        }
                    },
                    isLoad: true
                }, change: function (cmbo, newVal) {
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
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',allowBlank: false,
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/region'
                        }
                    },
                    isLoad: false
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            forceSelection: true,
            queryMode: 'local',allowBlank: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/district'
                        }
                    },
                    isLoad: false
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            allowBlank: false,
            name: 'physical_address'
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: 'Telephone',
            name: 'telephone_no'
        },
        
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            vtype:'email',
            allowBlank: true,
            name: 'email'
        },{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: '_token',
            value: token,
            allowBlank: true
        },
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
                    table_name: 'tra_permitsenderreceiver_data',
                    storeID: 'senderreceiverinformationgridstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});