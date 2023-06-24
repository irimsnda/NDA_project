/**
 * Created by Kip on 11/9/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.forms.DrugShopNearestPremiseFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'drugshopnearestpremiseFrm',
    scrollable:'true',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'hiddenfield',
            name: 'premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_premises_storelocation'
        },
         {
            xtype: 'textfield',
            name: 'name', 
             fieldLabel: 'Premise Name',
        },
        
        {
            xtype: 'textfield',
            name: 'Street',
            fieldLabel: 'Street/Road'
        },
         {
            xtype: 'textfield',
            name: 'distance', 
             fieldLabel: 'Distance(Km)',
        }, 

               {
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
                allowBlank:true,
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
                    },
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
                //store: 'regionsstr',
                allowBlank:true,
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
                //store: 'districtsstr',
                allowBlank:true,
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
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    }
                  
                }
        },
        {
            xtype: 'filefield',
            fieldLabel: 'Location Sketch',
            allowBlank: false,
            name: 'sketch'
        },
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_premises_storelocation',
            storeID: 'nearestpremisestr',
            action_url: 'premiseregistration/saveNearestPremiseDetails',
            handler: 'saveNearestPremiseDetails',
            name: 'save_btn'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            name: 'reset_btn',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});