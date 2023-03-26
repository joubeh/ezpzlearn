import { router, usePage } from "@inertiajs/react";
import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import { RadioGroup } from '@headlessui/react'


const MyAccount = () => {
    const {user, remainingDays, plans} = usePage().props
    const [selected, setSelected] = useState(plans[0])
    const [discountCode, setDiscountCode] = useState('')
    const [discount, setDiscount] = useState(0)
    const [isProcessing, setIsProcessing] = useState(false)

    const checkDiscountCode = () => {
        if(discountCode.trim() === '') return
        setIsProcessing(true)
        fetch(`/plus/check-discount-code/${discountCode}/${user.id}`)
        .then(res => res.json())
        .then(data => {
            setDiscount(data.percentage)
            setIsProcessing(false)
        })
        .catch(e => console.log(e))
    }

    function formattedPrice() {
        let p = selected.price;
        if(discount > 0) p -= p * (discount / 100)
        p /= 10
        p = p.toString()
        let formatted = ''
        let c = 3
        for(let i=p.length-1; i>=0; i--){
            if(c===0){
                formatted = p[i] + ',' + formatted
                c=3
            }else{
                formatted = p[i] + formatted
            }
            c--
        }
        return formatted
    }

    function buy() {
      checkDiscountCode()
      router.post('/plus/buy', {
        plan: selected.id,
        discountCode: discountCode
      })
    }

    return (
        <Layout>
        {
            user.plus_status ?
                <div className="text-xl text-center">اشتراک پلاس شما برای {remainingDays} روز دیگر فعال است</div>
                :
                <div className="text-xl text-center">شما اشتراک پلاس ندارید</div>
        }
        <div className="w-full px-4 py-16">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-3 text-xl text-violet-700 text-center">خرید اشتراک پلاس</div>
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
              <div className="space-y-2">
                {plans.map((plan) => (
                  <RadioGroup.Option
                    key={plan.name}
                    value={plan}
                    className={({ active, checked }) =>
                      `${
                        active
                          ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-violet-300'
                          : ''
                      }
                      ${
                        checked ? 'bg-violet-700 bg-opacity-75 text-white' : 'bg-white'
                      }
                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center">
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                  checked ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {plan.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={`inline ${
                                  checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                              >
                                <span>
                                  {plan.info}
                                </span>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className="shrink-0 text-white">
                              <CheckIcon className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
            <div className="mt-3 flex flex-col md:flex-row gap-2">
                <input value={discountCode} onChange={e => setDiscountCode(e.target.value)} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" id="discount" placeholder="کد تخفیف دارید؟ اینجا وارد کنید"/>
                <button onClick={e => checkDiscountCode()} className="bg-violet-500 text-white text-sm py-2 px-4 w-full md:w-1/3 rounded hover:bg-violet-400">
                    {
                        isProcessing ?
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            :
                            <>اعمال کد</>
                    }
                </button>
            </div>
            {
              discount === false &&
                <div className="mt-3 text-red-600 text-lg">
                    کد تخفیف اشتباه است یا منقضی شده
                </div>
            }
            {
              discount>0 &&
                <div className="mt-3 text-green-600 text-lg">
                    تخفیف {discount}% اعمال شد!
                </div>
            }
            <div className="mt-3">
                قیمت نهایی : {formattedPrice()} تومان
            </div>
            <div className="mt-3">
            <button onClick={e => buy()} className="bg-violet-500 text-white py-2 px-4 w-full rounded hover:bg-violet-400">پرداخت</button>
            </div>
          </div>
        </div>
        </Layout>
      )
    }
    
    function CheckIcon(props) {
      return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
          <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
          <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
}

export default MyAccount