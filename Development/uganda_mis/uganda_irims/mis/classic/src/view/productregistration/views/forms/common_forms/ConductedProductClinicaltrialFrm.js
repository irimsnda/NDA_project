/**
 * Created by Softclans
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ConductedProductClinicaltrialFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'conductedproductclinicaltrialfrm',
    // height: Ext.Element.getViewportHeight() - 118,
    controller: 'configurationsvctr',
    layout: {
        type: 'column'
    },
    itemId: 'conductedproductclinicaltrialfrmId',
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top'
    },
    items: [{
            xtype: 'hiddenfield',
            margin: '0 20 20 0',
            name: 'table_name',
            value: 'tra_productreg_clinicalresearchsdetails',
            allowBlank: true
        },{
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        }
        // ,{
        //     xtype: 'combo',
        //     fieldLabel: 'Recognized State Region',
        //     name: 'recognisedassessments_ctrregion_id',
        //     forceSelection: true,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     displayField: 'name',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 proxy: {
        //                     url: 'commonparam/getCommonParamFromTable',
        //                     extraParams: {
        //                         table_name: 'par_recognisedassessments_ctrregions'
        //                     }
        //                 }
        //             },
        //             isLoad: true
        //         },
        //         change: function(combo, newVal, oldVal, eopts){
        //             var form = combo.up('form'),
        //                 countryStr = form.down('combo[name=country_id]').getStore(),
        //                 filter = JSON.stringify({'recognisedassessments_ctrregion_id': newVal});
        //             countryStr.removeAll();
        //             countryStr.load({params:{'filters': filter}});
        //         }
        //     }
        // },
        // {
        //     xtype: 'combo',
        //     fieldLabel: 'Country of Study',
        //     name: 'country_id',
        //     forceSelection: true,
        //     queryMode: 'local',
        //     valueField: 'id',
        //     displayField: 'name',
        //     listeners: {
        //         beforerender: {
        //             fn: 'setConfigCombosStore',
        //             config: {
        //                 pageSize: 1000,
        //                 proxy: {
        //                     url: 'commonparam/getCountriesByStateRegions'
        //                 }
        //             },
        //             isLoad: false
        //         }
        //     }
        // }
        ,{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Research Organization',
            items: [
                {
                    xtype: 'textfield',
                    name: 'clinical_researchorganisation',
                    submitValue: false,
                    columnWidth: 0.9
                },{
                    xtype: 'hiddenfield',
                    name: 'clinical_researchorganisation_id',
                    readOnly: true,
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Organization',
                    childXtype: 'researchOrgsGrid',
                    winTitle: 'Select Research Organization',
                    callerRef: 'conductedproductclinicaltrialfrmId', 
                    winWidth: '50%',
                    stores: '[]',
                    name: 'showResearchOrgListGrid'
                }
            ]
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Application Date',
            format: 'Y-m-d',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            name: 'application_date',
            maxValue: new Date() 
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Application Reference',
            name: 'application_reference'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Contact person',
            name: 'contact_person'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Contact Person Email',
            name: 'contact_person_email'
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
                    table_name: 'tra_productreg_clinicalresearchsdetails',
                    storeID: 'conductedproductclinicaltrialStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});